import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { StackScreens } from "../../../routes/types/StackScreens";
import { ScreenHeader } from "../../../shared/components";
import { colors, fonts } from "../../../shared/style";
// @ts-ignore
import LeftArrow from '@assets/img/arrowLeft.svg';
import { useEvent, useStore } from "effector-react";
import { $profile } from "../../../features/create-profile";
import { $subscription, PlanContainer, setSubscriptionTypes, StatusContainer, UrgentOrdersStatus } from "src/features/subscription";
import { UserRoleBackend } from "src/types/role";
import { approveSubscription, getSubscriptionTypesActions, subscribe } from "src/features/subscription/model/subscription-actions";
import { SubscribePopup } from "src/features/subscription/ui/SubscribePopup";
import { ISubscriptionType } from "src/screens/subscription/subscription-response";
import { CompletedSubcription } from "src/features/subscription/ui/CompletedSubscription";

type ISubScreenPeops = NativeStackScreenProps<StackScreens, "SubScreen">

export const SubScreen: React.FC<ISubScreenPeops> = ({ navigation }) => {
    const { data: profileData } = useStore($profile);
    const { data: subscriptionData } = useStore($subscription);

    const handleSetSubscriptionTypes = useEvent<ISubscriptionType[]>(setSubscriptionTypes)
    
    const [loading, setLoading] = useState<boolean>(false);
    const [subscribing, setSubscribing] = useState<boolean>(false);
    const [subscribeUrl, setSubscribeUrl] = useState<string>(null);
    const [subscribeStatus, setSubscribeStatus] = useState<'completed'>(null);
    const [subscribeType, setSubscribeType] = useState<string>(null);

    useEffect(() => {
        setLoading(true);
        getSubscriptionTypesActions(UserRoleBackend.DRIVER)
            // @ts-ignore
            .then((res) => handleSetSubscriptionTypes(res))
            .catch((err) => console.error('Failed to get subscription types', err))
            .finally(() => setLoading(false));
    }, []);

    const handleSubscribe = async (type: string) => {
        try {
            setSubscribing(true);
            const data = await subscribe();
            if (data?.data) {
                setSubscribeUrl(data.data);
                setSubscribeType(type);
            }
        } catch (err) {
            console.error('Failed to subscribe', err);
        } finally {
            setSubscribing(false);
        }
    };

    const handleUpproveSubscribe = async () => {
        if (subscribeType) {
            try {
                const data = await approveSubscription(subscribeType);
                if (data?.message === 'success') {
                    setSubscribeStatus('completed')
                }
            } catch (err) {
                console.error('Failed to approve subscription', err);
            }
        }
    }

    const handleClosePopup = () => {
        setSubscribeUrl(null);
    }

    return(
        <>
            <SubscribePopup 
                isOpen={subscribeUrl !== null} 
                url={subscribeUrl} 
                onClose={handleClosePopup}
                onComplete={handleUpproveSubscribe}/>
            <CompletedSubcription 
                isOpen={subscribeStatus === 'completed'} 
                onClose={() => setSubscribeStatus(null)}/>
            <SafeAreaView style={styles.layout}>
                <ScreenHeader leftIcon={<LeftArrow />} onLeftButtonPress={() => navigation.goBack()}/>
                <View style={styles.content}>
                    <StatusContainer subStatus={profileData.subscription_status}/>
                    <ScrollView contentContainerStyle={styles.plans_list}>
                        {
                            subscriptionData.map((item) => (
                                <PlanContainer 
                                    key={item._id}
                                    role={UserRoleBackend.DRIVER} 
                                    description={item.description} 
                                    price={item.price}
                                    type={item.type}
                                    onSubscribe={handleSubscribe}/>
                            ))
                        }
                        <UrgentOrdersStatus subscribed={profileData.subscription_status}/>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        paddingHorizontal: 20
    },
    plans_list: {
        flexGrow: 1
    }
});