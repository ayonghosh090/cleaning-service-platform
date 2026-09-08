import AuthForm from "../../components/auth/AuthForm";

export default function RegisterPage() {
  return <main className="auth-page"><div className="auth-aside"><a className="auth-brand" href="/">CleanCare<span>created by Anik Ghosh</span></a><div><p className="eyebrow">A fresh beginning</p><h2>Make room for<br /><em>better days.</em></h2><p>Join a community of people making space for the life they want to live.</p></div><span className="auth-aside-note">Thoughtful cleaning, always <b>✦</b></span></div><div className="auth-main"><AuthForm mode="register" /></div></main>;
}
