import React from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TabMenuItem } from './TabMenuItem';
import { sharedStyles } from '../../style/styles';

export type TabItemModel = {
  [key: string]: string;
};

interface TabMenuProps {
  activeTab: string;
  tabs: TabItemModel;
  onChangeTab: (activeTab: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TabMenu: React.FC<TabMenuProps> = function TabMenu(props) {
  const tabList = Object.entries(props.tabs);
  const widthTabProc = 100 / tabList.length;

  return (
    <View>
      <ScrollView
        contentContainerStyle={[compStyles.container, sharedStyles.row]}
        horizontal={true}
      >
        {tabList.map(tab => (
          <TabMenuItem
            key={`tab-${tab[0]}`}
            value={tab[1]}
            widthTabProc={widthTabProc}
            activeTab={props.activeTab}
            onChangeTab={props.onChangeTab}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const compStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
