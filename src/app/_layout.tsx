import {
  ClerkProvider,
  useAuth,
  useClerk,
  useUser,
  useUserProfileModal,
} from "@clerk/expo";
import { AuthView } from "@clerk/expo/native";

import { tokenCache } from "@clerk/expo/token-cache";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import "../../global.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

function RootStack() {
  const { isLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false });
  const { user } = useUser();
  const { signOut } = useClerk();
  const { presentUserProfile } = useUserProfileModal();

  if (!isLoaded) {
    return <ActivityIndicator size="large" />;
  }

  if (!isSignedIn) {
    return <AuthView mode="signInOrUp" />;
  }

  return <Stack />;
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootStack />
    </ClerkProvider>
  );
}
