type Company = "google" | "github"

type Variant = {
	name: string,
	icon: string,
	url: string,
}

function initGithubAuth(): Variant {
	const githubAuthUrl = "https://github.com/login/oauth/authorize"
	const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!
	const callbackUrl = process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL!
	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: callbackUrl,
		scope: "read:user"
	})
	return ({
    name: "Github",
    icon: "github-icon.svg",
    url: `${githubAuthUrl}?${params.toString()}`,
  })
}

function initGoogleAuth() {
	const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth"
	const googleAuthScopes = [
		"https://www.googleapis.com/auth/userinfo.email",
  	"https://www.googleapis.com/auth/userinfo.profile",
	]
	const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
	const callbackUrl = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL!
	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: callbackUrl,
		response_type: "code",
		scope: googleAuthScopes.join(" ")
	})
	return ({
    name: "Google",
    icon: "google-icon.svg",
    url: `${googleAuthUrl}?${params.toString()}`,
  })
}
const authVariants: Variant[] = [
	initGoogleAuth(),
	initGithubAuth(),
] as const;

export { authVariants, type Company }