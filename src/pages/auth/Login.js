import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import LogoDark from '../../images/logo-dark.png';
import PageContainer from '../../layout/page-container/PageContainer';
import Head from '../../layout/head/Head';
import AuthFooter from './AuthFooter';
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, Icon, PreviewCard } from '../../components/Component';
import { Form, FormGroup, Spinner, UncontrolledAlert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { authenticate } from '../../utils/nspgApi';
import { Redirect } from 'react-router-dom';
import { toastAlert } from '../components/mondelez/utils/toast';

const Login = ({ authenticated, checkifUserAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [error, setError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = async () => {
    setLoading(true);
    try {
      await authenticate({
        username: username,
        password: password
      });
      toastAlert('User successfully authenticated.', 'Successful login!');

      checkifUserAuthenticated();
    } catch (error) {
      setError(error.response.data.detail);
      setLoading(false);
    }
  };

  const { errors, register, handleSubmit } = useForm();

  if (authenticated) return <Redirect to="/" />;

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to="/" className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Access the Network Portal using your email and password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {error && (
              <div className="mb-3">
                <UncontrolledAlert className="alert-icon" color="danger" fade={false}>
                  <Icon name="cross-circle" />
                  <strong>Login failed</strong>! {error}
                </UncontrolledAlert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="name"
                    ref={register({ required: 'This field is required' })}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <Link className="link link-primary link-sm" to={`/auth-reset`}>
                    Forgot Password?
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? 'is-hidden' : 'is-shown'}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? 'text' : 'password'}
                    id="password"
                    name="passcode"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ref={register({ required: 'This field is required' })}
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? 'is-hidden' : 'is-shown'}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : 'Sign in'}
                </Button>
              </FormGroup>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              {' '}
              New on Network Portal? <Link to={`/auth-register`}>Create an account</Link>
            </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
