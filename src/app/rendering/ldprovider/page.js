import styles from "../../page.module.css";
import LDProvider from "@/components/LDProvider";
import LogoClientComponent from "@/components/LogoClientComponent";
import LogoHybridComponent from "@/components/LogoHybridComponent";
import LogoServerComponent from "@/components/LogoServerComponent";
import LDSDK from "@/lib/ldServer";

import React, { Suspense } from "react";

const defaultContext = {
  kind: "server-context",
  key: "nextjs-app-component",
};

const clientContext = {
  clientSideID: process.env.CLIENT_SIDE_ID,
  context: {
    kind: "user",
    key: "user-key-123abc",
    name: "Sandy Smith",
  },
  options: {},
};
const Loading = () => <h1 className={styles.center}>Loading...</h1>;

export default async function page() {
  const bootstrapValue = await LDSDK.getVariation(
    "simple-toggle",
    defaultContext,
    false
  );

  const i2iValue = await LDSDK.getVariation(
    "image-to-image",
    {
      kind: "market",
      key: "phoenix",
      name: "Phoenix",
      user: "Jacob Granberry",
    },
    false
  );

  const defaultLogoProps = {
    defaultSrc: "/next.svg",
    srcTrue: "/launchdarkly.svg",
  };

  return (
    <>
      <h1 className={styles.center}>
        App Router: Server Rendering + Client hydration
      </h1>
      <h2 className={styles.center}>LDProvider example</h2>
      <h2 className={styles.center}>
        {i2iValue === "Control"
          ? "Default headline"
          : "New headline that targets Phoenix users only"}
      </h2>
      <main className={styles.main}>
        <div className={styles.grid}>
          <LDProvider {...clientContext}>
            <Suspense fallback={<Loading />}>
              <div className={styles.card}>
                <LogoClientComponent
                  flagKey='imageToImage'
                  {...defaultLogoProps}
                />

                <div className={styles.description}>
                  <p>Client Component</p>
                </div>
              </div>
            </Suspense>
            <Suspense fallback={<Loading />}>
              <div className={styles.card}>
                <LogoHybridComponent
                  defaultValue={i2iValue}
                  flagKey='imageToImage'
                  {...defaultLogoProps}
                />

                <div className={styles.description}>
                  <p>Hybrid Component</p>
                  <p>Client Component w/ Server Bootstraped</p>
                </div>
              </div>
            </Suspense>
          </LDProvider>
          <div className={styles.card}>
            <LogoServerComponent
              flagKey='image-to-image'
              {...defaultLogoProps}
            />
            <div className={styles.description}>
              <p>Server component</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
