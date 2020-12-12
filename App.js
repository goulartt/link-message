import React, { useState, useContext } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from './Components/FormInput';
import FormButton from './Components/FormButton';
import FormInputArea from './Components/FormInputArea';
import RNPhoneCodeSelect from "react-native-phone-code-select";
import { TextInputMask } from 'react-native-masked-text';
import { translate } from './Locales';

export default function App() {
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [code, setCode] = useState('');
  const [country, setCountry] = useState('');

  const [visible, setVisible] = useState(false);

  const initChat = () => {
    Linking.openURL(`https://api.whatsapp.com/send?phone=${code}${phone}&text=${msg}`).catch((err) => console.error('An error occurred', err));
  }

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>{translate('title')}</Title>
      <RNPhoneCodeSelect
        visible={visible}
        onDismiss={() => setVisible(false)}
        onCountryPress={(country) => {
          setCode(country.dial_code)
          setCountry(country.name)
        }}
        primaryColor="#f04a4a"
        secondaryColor="#000000"
        buttonText="Ok"
      />
      <View >
        <FormInput
          labelName={translate('countryCode')}
          value={country}
          onFocus={() => setVisible(true)}
        />
        <FormInput
          labelName={translate('phone')}
          value={phone}
          type="number"
          onChangeText={phone => setPhone(phone)}
          render={props =>
            <TextInputMask
              style={{ padding: 10, marginTop: 10 }}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              value={phone}
              onChangeText={phone => setPhone(phone)}
            />
          }
        />
      </View>

      <FormInputArea
        labelName={translate('msg')}
        value={msg}
        onChangeText={msg => setMsg(msg)}
      />

      <FormButton
        title={translate('button')}
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        icon="message"
        onPress={() => initChat()}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 15
  },
  navButtonText: {
    fontSize: 16
  }
});