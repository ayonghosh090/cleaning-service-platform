import AuthForm from "../../components/auth/AuthForm";

export default function LoginPage() {
  return <main className="auth-page"><div className="auth-aside"><a className="auth-brand" href="/">CleanCare<span>created by Anik Ghosh</span></a><div><p className="eyebrow">Your home, handled</p><h2>More time for<br /><em>what matters.</em></h2><p>Come home to a space that feels lighter, calmer, and completely yours.</p></div><span className="auth-aside-note">A cleaner kind of care <b>✦</b></span></div><div className="auth-main"><AuthForm mode="login" /></div></main>;
}
