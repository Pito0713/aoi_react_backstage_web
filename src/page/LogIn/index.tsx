import * as React from 'react';
import { AppContext } from '../../redux/AppContent';
import { useFormik } from 'formik';
import Service from '../../Service/Service';
import { APP_SECRCT_KEY } from '../../env/config'
import AES from 'crypto-js/aes';

export default function LogInPage() {

  const appCtx: any = React.useContext(AppContext);
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      account: '',
      password: '',
    },
    validate: values => {
      const errors = {} as any;
      if (!values.account) {
        errors.account = '*' + '帳號必填';
      }
      if (!values.password) {
        errors.password = '*' + '密碼必填';
      }
      return errors;
    },
    onSubmit: async values => {
      logIn(values);
    },
  });

  const logIn = async values => {
    appCtx.setLoading(true);
    let submitData = {
      account: formik.values.account,
      password: formik.values.password,
    };
    const response = await Service.postUserBackLogin(submitData);
    console.log(response);

    if (!['', null, undefined].includes(response?.data)) {
      dispatchHandler(response.data);
      // 加密
      let ciphertext = AES.encrypt(
        formik.values.password,
        APP_SECRCT_KEY,
      ).toString();
      appCtx.setPassWord(ciphertext);
      window.localStorage.setItem('password', ciphertext);
    }
    appCtx.setLoading(false);
  };

  const dispatchHandler = values => {
    if (!['', null, undefined].includes(values?.userBack?.account)) {
      window.localStorage.setItem('account', values?.userBack?.account);
    }
    if (!['', null, undefined].includes(values?.userBack?.token)) {
      window.localStorage.setItem('token', values?.userBack?.token);
    }
    if (!['', null, undefined].includes(values?.userBack?.permission)) {
      window.localStorage.setItem('permission', values?.userBack?.permission);
    }
    if (!['', null, undefined].includes(values?.userBack?.id)) {
      window.localStorage.setItem('id', values?.userBack?.id);
    }
  };


  return (
    <div style={{ flex: 1 }}>
      <div style={{
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        <input
          placeholder={'請輸入帳號'}
          value={formik.values.account}
          onChange={formik.handleChange('account')}
          style={{
            width: '100%',
            paddingLeft: 15,
            height: 45,
            margin: 5,
          }}
        />

        <div style={{
          padding: 10,
          justifyContent: 'center',
          marginLeft: '25%',
        }}>
          {['', null, undefined].includes(formik.values.account) && (
            <a
              style={{ color: appCtx.Colors.errorText, fontSize: 12 }}>
              {formik.errors.account}
            </a>
          )}
        </div>



        <input
          placeholder={'請輸入密碼'}
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          style={{
            width: '100%',
            paddingLeft: 15,
            height: 45,
            margin: 5,
          }}
        />

        <div style={{
          padding: 10,
          justifyContent: 'center',
          marginLeft: '25%',
        }}>
          {['', null, undefined].includes(formik.values.password) && (
            <a
              style={{ color: appCtx.Colors.errorText, fontSize: 12 }}>

              {formik.errors.password}
            </a>
          )}
        </div>

      </div>

      <div style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div
          style={

            {
              textAlign: 'center', backgroundColor: appCtx.Colors.primary, justifyContent: 'center',
              alignItems: 'center',
              width: '30%',
              borderWidth: 1.5,
              borderRadius: 5,
            }
          }
          onClick={() => formik.submitForm()}>
          <a style={{ padding: 15, }}>{'登入'}</a>
        </div>
      </div>
      <div style={{
        paddingTop: 30,
        width: '90%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
      }}>
        {/* <div
            onClick={() => setRememberInfo(!rememberInfo)}
            style={{flexDirection: 'row'}}>
            <CheckBox
              disabled={false}
              value={rememberInfo}
              onValueChange={() => setRememberInfo(!rememberInfo)}
            />
            <a style={{marginLeft: 8}}>{'記住帳號'}</a>
          </div> */}
        <div>
          <a
            style={{ marginLeft: 20 }}
          // onPress={() => navigation.navigate('register')}
          >
            {'創立帳號'}
          </a>
        </div>
      </div>

    </div>
  );
};
