import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/COLORS';
import {Fonts} from '../../../../interface/fonts.enum';

export interface ButtonProps {
  text: string;
  onPress: () => void;
  isFocused: boolean;
  disabled?: boolean;
}

interface CustomModalProps {
  visible: boolean;
  description?: string;
  buttons: ButtonProps[];
  type: 'success' | 'warning' | 'error' | 'info';
}

const CustomModal = ({
  description,
  buttons,
  type,
  visible,
}: CustomModalProps) => {
  const buttonBackgroundColor = (isFocused: boolean) => {
    if (type === 'success' && isFocused) {
      return COLORS.successButtonBg;
    } else if (type === 'warning' && isFocused) {
      return COLORS.warningButtonBg;
    } else if (type === 'error' && isFocused) {
      return COLORS.errorButtonBg;
    } else if (type === 'info' && isFocused) {
      return COLORS.infoButtonBg;
    } else {
      return 'transparent';
    }
  };

  const buttonTextColor = (isFocused: boolean) => {
    if (type === 'success' && !isFocused) {
      return COLORS.successButtonBg;
    } else if (type === 'warning' && !isFocused) {
      return COLORS.warningButtonBg;
    } else if (type === 'error' && !isFocused) {
      return COLORS.errorButtonBg;
    } else if (type === 'info' && !isFocused) {
      return COLORS.infoButtonBg;
    } else {
      return 'white';
    }
  };

  const modalIcon = () => {
    if (type === 'success') {
      return require('../../../../../assets/icons/success.png');
    } else if (type === 'warning') {
      return require('../../../../../assets/icons/warning.png');
    } else if (type === 'error') {
      return require('../../../../../assets/icons/error.png');
    } else if (type === 'info') {
      return require('../../../../../assets/icons/info.png');
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor:
                type === 'success'
                  ? COLORS.successBg
                  : type === 'warning'
                  ? COLORS.warningBg
                  : type === 'error'
                  ? COLORS.errorBg
                  : COLORS.infoBg,
            },
          ]}>
          <Image
            style={{width: 60, height: 60, position: 'absolute', top: -30}}
            source={modalIcon()}
          />
          <Text style={[styles.modalTitle, {color: 'white'}]}>
            {type === 'success'
              ? 'Başarılı'
              : type === 'warning'
              ? 'Uyarı'
              : type === 'error'
              ? 'Hata'
              : 'Bilgi'}
          </Text>
          <Text style={[styles.modalText, {color: 'white'}]}>
            {description}
          </Text>
          <View style={styles.buttonContainer}>
            {buttons.map(
              (button, index) =>
                !button.disabled && (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      {
                        backgroundColor: buttonBackgroundColor(
                          button.isFocused,
                        ),
                        borderWidth: button.isFocused ? 0 : 1,
                        borderColor: button.isFocused
                          ? 'transparent'
                          : buttonTextColor(button.isFocused),
                      },
                    ]}
                    onPress={button.onPress}>
                    <Text
                      style={[
                        styles.buttonText,
                        {color: buttonTextColor(button.isFocused)},
                      ]}>
                      {button.text}
                    </Text>
                  </TouchableOpacity>
                ),
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.67)',
  },
  modalView: {
    width: Dimensions.get('screen').width * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginTop: 40,
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: Fonts.Bold,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: Fonts.Medium,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: Dimensions.get('screen').width * 0.35,
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
    textAlign: 'center',
  },
});
