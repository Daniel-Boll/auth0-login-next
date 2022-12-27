import { GetServerSideProps } from "next";
import {
  NextRouteComponent,
  handleRefineParams,
} from "@pankod/refine-nextjs-router";
import { checkAuthentication } from "@pankod/refine-nextjs-router";

import dataProvider from "@pankod/refine-simple-rest";
const API_URL = "https://api.fake-rest.refine.dev";

import { authProvider } from "src/authProvider";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resource, action, id } = handleRefineParams(context.params?.refine);

  const { isAuthenticated, ...props } = await checkAuthentication(
    authProvider,
    context
  );

  const i18nProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!isAuthenticated) {
    return { props: { ...props, ...i18nProps } };
  }

  try {
    if (resource && action === "show" && id) {
      const data = await dataProvider(API_URL).getOne({
        resource: resource.slice(resource.lastIndexOf("/") + 1),
        id,
      });

      return {
        props: {
          initialData: data,
          ...i18nProps,
        },
      };
    } else if (resource && !action && !id) {
      const data = await dataProvider(API_URL).getList({
        resource: resource.slice(resource.lastIndexOf("/") + 1),
      });

      return {
        props: {
          initialData: data,
          ...i18nProps,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        ...i18nProps,
      },
    };
  }

  return {
    props: {
      ...i18nProps,
    },
  };
};

export default NextRouteComponent;

/**
 * To define a custom initial route for refine to redirect and start with:
 *
 * Bind the `initialRoute` value to the `NextRouteComponent` like the following:
 *
 * export default NextRouteComponent.bind({ initialRoute: "/posts" });
 *
 **/
