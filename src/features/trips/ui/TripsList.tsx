import { useUnit } from "effector-react";
import { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Order } from "src/types/order";
import { TRIPS_MOCK } from "../constants/trips";
import { $trips, setTrips as setStoreTrips } from "../model/TripsStore";
import { TripItem } from "./TripItem";

interface ITripsListProps {
    onTripPress: (id: string) => void;
};

export const TripsList: FC<ITripsListProps> = ({ onTripPress }) => {
    const [tripsStore, handleSetTrips] = useUnit([$trips, setStoreTrips]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleRefreshTrips = () => {
        try {
            setLoading(true);
        } catch (err) {
            console.error('Failed to refresh trips list', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleSetTrips(TRIPS_MOCK);
    }, []);

    return(
        <ScrollView 
            contentContainerStyle={styles.list}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefreshTrips}/>}>
            {
                tripsStore.data.map((item: Order) => (
                    <TripItem 
                        key={item._id}
                        departureCity={item.order_start}
                        departureAddress={item.order_start_full}
                        arrivalCity={item.order_end}
                        arrivalAddress={item.order_end_full}
                        date={new Date()}
                        distance={item.order_distance}
                        price={item.order_price}
                        status={item.order_status}
                        onPress={() => onTripPress(item._id)}/>
                ))
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    list: {
        flexGrow: 1,
        paddingHorizontal: 20,
        marginVertical: 10,
        rowGap: 10
    },
});