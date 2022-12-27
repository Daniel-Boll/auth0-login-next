import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Header } from "@components/layout";
import { Login } from "@components/login";
import { OffLayoutArea } from "@components/offLayoutArea";
import { PostCreate, PostEdit, PostList } from "@components/posts";
import { ColorModeContextProvider } from "@contexts";
import { Refine } from "@pankod/refine-core";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import {
  CssBaseline,
  ErrorComponent,
  GlobalStyles,
  Layout,
  notificationProvider,
  ReadyPage,
  RefineSnackbarProvider,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";
import { appWithTranslation, useTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { authProvider } from "src/authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <UserProvider>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <RefineKbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(API_URL)}
              notificationProvider={notificationProvider}
              Layout={Layout}
              ReadyPage={ReadyPage}
              catchAll={<ErrorComponent />}
              Header={Header}
              authProvider={authProvider}
              LoginPage={Login}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "posts",
                  list: PostList,
                  create: PostCreate,
                  edit: PostEdit,
                },
              ]}
              OffLayoutArea={OffLayoutArea}
            >
              <Component {...pageProps} />
            </Refine>
          </RefineKbarProvider>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </UserProvider>
  );
}

export default appWithTranslation(MyApp);
