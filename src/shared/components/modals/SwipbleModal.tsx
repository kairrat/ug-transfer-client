import React from 'react';
import { Dimensions, StatusBar, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { IHandles } from 'react-native-modalize/lib/options';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../style/colors';
import { sharedStyles } from '../../style/styles';

interface ISwipeableModalProps extends ModalizeProps {
  children: JSX.Element | JSX.Element[];
  modalizeRef: React.RefObject<IHandles>;
  fullScreen?: boolean;
  onClose?: () => void;
  modalStyle?: StyleProp<ViewStyle>;
  scrollContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SwipeableModal: React.FC<ISwipeableModalProps> = function name(props) {
  const { children, modalizeRef, fullScreen, onClose, ...otherProps } = props;

  const width = Dimensions.get('screen').width;
  const insets = useSafeAreaInsets();

  const handleModalClose = () => {
    if (onClose) {
      onClose();
    }

    modalizeRef.current?.close();
  };

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        modalStyle={[fullScreen && [styles.modal, { marginTop: insets.top }, props.modalStyle]]}
        withHandle={false}
        scrollViewProps={{
          horizontal: true,
          showsVerticalScrollIndicator: false,
          contentContainerStyle: [
            { paddingBottom: insets.bottom },
            fullScreen && { height: '100%' },
            props.scrollContainerStyle,
          ],
        }}
        closeOnOverlayTap
        tapGestureEnabled
        adjustToContentHeight={true}
        disableScrollIfPossible={false}
        panGestureComponentEnabled
        onClose={() => handleModalClose}
        {...otherProps}
      >
        <StatusBar barStyle={'light-content'} backgroundColor={colors.black} />
        <View
          style={[
            styles.container,
            sharedStyles.paddingHorizontal,
            { width: width },
            props.containerStyle,
          ]}
        >
          {children}
        </View>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    minHeight: '100%',
  },
  container: {
    paddingTop: 20,
  },
});
