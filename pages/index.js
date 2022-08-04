import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'

// package
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { END } from 'redux-saga'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Button, Image } from 'antd'
import 'antd/dist/antd.css'
import dynamic from 'next/dynamic'
import { wrapper } from '../appRedux/store'

import Link from 'next/link';
import champions from '../data';

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

// actions
import { queryDynamoDB, queryRDS } from '../appRedux/actions'

const IMAGE_URL = process.env.IMAGE_URL;

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

const RoutingPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { dynamoDB_Data, rds_Data, dynamoDB_Data_loader, rds_Data_loader } = useSelector((state) => state)

  const _dynamoDB_onClick = () => {
    dispatch(queryDynamoDB())
  }
  const _rds_onClick = () => {
    dispatch(queryRDS())
  }

  useEffect(() => {
    // let href = window.location.href
    
    var href = "http://localhost:3000/";
    href += "#access_token=eyJraWQiOiJWMWpGVkk4Z0lZa3F4ZFNNcTNXQTZrSHFOVEV4NmNwcFZDQjdkbkY1alA0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjMWFhMWM0Yy00OTkyLTRmNDYtYjdmZS1mYmU1Y2FkMzVhOGQiLCJjb2duaXRvOmdyb3VwcyI6WyJhcC1zb3V0aGVhc3QtMV9hWlpTV3RmT2ZfQURGUzJGQSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfYVpaU1d0Zk9mIiwidmVyc2lvbiI6MiwiY2xpZW50X2lkIjoiNzMxcjhxOWs2ODBvY3J0aWk0bnEyODNuMnEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY1OTYzMTAxOCwiZXhwIjoxNjU5NjM0NjE4LCJpYXQiOjE2NTk2MzEwMTgsImp0aSI6IjIxMzcxNWNmLWU4ODAtNDY0ZC05ODU2LWZmNzY1MzRmMWVmYSIsInVzZXJuYW1lIjoiQURGUzJGQV8wMDE0NDU1NyJ9.EIaK2iC7yY1c5FyxofZJJUmOE-yqyoqutnlJDEs47DPgH_YmXxCbE_Eu5Pm7tPMP_CtMf9QhSEEKv_NId2X4eNOK-BKuM67l0iNPFm9h7pt3Di8rAYkGa4t5zx6P23K42b6bG7Q0jiovfYfE87cqAWfNJbSDKFSUGeVnxrd0QYph8NcXwgnlpCvQQ7HbMYzeWVcqDhmozUvZ0lGPboNuDBdx5DaUnC26nZ1i0qS_F3MSrsgn-rLBeCIA0vS98YWizup9qg5ByWnQalfxI6SJ6J2Z_dKVUXBn4gxVNY5Kb1yIbELi9d2iAaHSdyh_xwmGiv8XmsdBr6haNg6D80dh-Q"
    href += "&id_token=eyJraWQiOiJBWFZZQXVZMk5KKzBUVG5oekRGdmhKZ0NRQlF1TlFtQklnQVZLOHBkejFzPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiaXV5bk9zZkZldDZieTFyR0lfNUdpUSIsInN1YiI6ImMxYWExYzRjLTQ5OTItNGY0Ni1iN2ZlLWZiZTVjYWQzNWE4ZCIsImNvZ25pdG86Z3JvdXBzIjpbImFwLXNvdXRoZWFzdC0xX2FaWlNXdGZPZl9BREZTMkZBIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX2FaWlNXdGZPZiIsImNvZ25pdG86dXNlcm5hbWUiOiJBREZTMkZBXzAwMTQ0NTU3Iiwibm9uY2UiOiJ3bWxTZ1duNFdfcjNITXZQTkhaQVljWEplTjYxNnZ6MVEzSk91c1RfSkZrNEFpNlpHdGdDYXNKMlphT2hVOWF2WlVIZ09TRzE3UVVwUFgzVkc4U2xNdmoyUVRjOEJwekJySzd6SFZBd2c0djlWLUpaOGtYbmVXd2FXSlRTYXlmSGhaV2h1LWZqRlR1UDEwOWVzc1RjODZ0NXhaaHlFUFhqbmZZWHJJaW1pUk0iLCJhdWQiOiI3MzFyOHE5azY4MG9jcnRpaTRucTI4M24ycSIsImlkZW50aXRpZXMiOlt7InVzZXJJZCI6IjAwMTQ0NTU3IiwicHJvdmlkZXJOYW1lIjoiQURGUzJGQSIsInByb3ZpZGVyVHlwZSI6IlNBTUwiLCJpc3N1ZXIiOiJodHRwOlwvXC9tc3RzLm1heWJhbmsuY29tXC9hZGZzXC9zZXJ2aWNlc1wvdHJ1c3QiLCJwcmltYXJ5IjoidHJ1ZSIsImRhdGVDcmVhdGVkIjoiMTY1ODM3MjM0MTI3NiJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTk2MzEwMTgsImV4cCI6MTY1OTYzNDYxOCwiaWF0IjoxNjU5NjMxMDE4LCJlbWFpbCI6Im11aGFtbWFkZmFyaXMuamFtYWxAbWF5YmFuay5jb20ifQ.UjSGBOeuaOGXhn_1gBLHhWUTp0ye83wFi7GCmrGpsuNNfj6hiz3M74xKAusErzdHBL4vM5Ye7rj2WvCgOm_YnwAtj9X4adwH1vaXoD_9sNw8StHf-XV3w0gehqsnobvZNwvlT5qnVOcxp0zhX6T-J17HYEXU-OFV0xG3jo_N5hk9hSkbNJ85X1OBRfhQLhOvB8uWCqQdznbazYQEaUlEhnPVXGzIuSvJXTydxy2YNxAeduiGnAd316a9b_ricua2IdIXRQa8DhKEoZ8xSElcSQi6EOk59ZrMz5F2SpRuEFu-_A3EH73c8Q-AMyN2dtVfxN3s2GvNXmjRS-LmiRTr0A"
    href += "&token_type=Bearer"
    href += "&expires_in=3600"
    
    // access_token=eyJraWQiOiJWMWpGVkk4Z0lZa3F4ZFNNcTNXQTZrSHFOVEV4NmNwcFZDQjdkbkY1alA0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjMWFhMWM0Yy00OTkyLTRmNDYtYjdmZS1mYmU1Y2FkMzVhOGQiLCJjb2duaXRvOmdyb3VwcyI6WyJhcC1zb3V0aGVhc3QtMV9hWlpTV3RmT2ZfQURGUzJGQSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfYVpaU1d0Zk9mIiwidmVyc2lvbiI6MiwiY2xpZW50X2lkIjoiNzMxcjhxOWs2ODBvY3J0aWk0bnEyODNuMnEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY1OTYzMTAxOCwiZXhwIjoxNjU5NjM0NjE4LCJpYXQiOjE2NTk2MzEwMTgsImp0aSI6IjIxMzcxNWNmLWU4ODAtNDY0ZC05ODU2LWZmNzY1MzRmMWVmYSIsInVzZXJuYW1lIjoiQURGUzJGQV8wMDE0NDU1NyJ9.EIaK2iC7yY1c5FyxofZJJUmOE-yqyoqutnlJDEs47DPgH_YmXxCbE_Eu5Pm7tPMP_CtMf9QhSEEKv_NId2X4eNOK-BKuM67l0iNPFm9h7pt3Di8rAYkGa4t5zx6P23K42b6bG7Q0jiovfYfE87cqAWfNJbSDKFSUGeVnxrd0QYph8NcXwgnlpCvQQ7HbMYzeWVcqDhmozUvZ0lGPboNuDBdx5DaUnC26nZ1i0qS_F3MSrsgn-rLBeCIA0vS98YWizup9qg5ByWnQalfxI6SJ6J2Z_dKVUXBn4gxVNY5Kb1yIbELi9d2iAaHSdyh_xwmGiv8XmsdBr6haNg6D80dh-Q
    // id_token=eyJraWQiOiJBWFZZQXVZMk5KKzBUVG5oekRGdmhKZ0NRQlF1TlFtQklnQVZLOHBkejFzPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiaXV5bk9zZkZldDZieTFyR0lfNUdpUSIsInN1YiI6ImMxYWExYzRjLTQ5OTItNGY0Ni1iN2ZlLWZiZTVjYWQzNWE4ZCIsImNvZ25pdG86Z3JvdXBzIjpbImFwLXNvdXRoZWFzdC0xX2FaWlNXdGZPZl9BREZTMkZBIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX2FaWlNXdGZPZiIsImNvZ25pdG86dXNlcm5hbWUiOiJBREZTMkZBXzAwMTQ0NTU3Iiwibm9uY2UiOiJ3bWxTZ1duNFdfcjNITXZQTkhaQVljWEplTjYxNnZ6MVEzSk91c1RfSkZrNEFpNlpHdGdDYXNKMlphT2hVOWF2WlVIZ09TRzE3UVVwUFgzVkc4U2xNdmoyUVRjOEJwekJySzd6SFZBd2c0djlWLUpaOGtYbmVXd2FXSlRTYXlmSGhaV2h1LWZqRlR1UDEwOWVzc1RjODZ0NXhaaHlFUFhqbmZZWHJJaW1pUk0iLCJhdWQiOiI3MzFyOHE5azY4MG9jcnRpaTRucTI4M24ycSIsImlkZW50aXRpZXMiOlt7InVzZXJJZCI6IjAwMTQ0NTU3IiwicHJvdmlkZXJOYW1lIjoiQURGUzJGQSIsInByb3ZpZGVyVHlwZSI6IlNBTUwiLCJpc3N1ZXIiOiJodHRwOlwvXC9tc3RzLm1heWJhbmsuY29tXC9hZGZzXC9zZXJ2aWNlc1wvdHJ1c3QiLCJwcmltYXJ5IjoidHJ1ZSIsImRhdGVDcmVhdGVkIjoiMTY1ODM3MjM0MTI3NiJ9XSwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTk2MzEwMTgsImV4cCI6MTY1OTYzNDYxOCwiaWF0IjoxNjU5NjMxMDE4LCJlbWFpbCI6Im11aGFtbWFkZmFyaXMuamFtYWxAbWF5YmFuay5jb20ifQ.UjSGBOeuaOGXhn_1gBLHhWUTp0ye83wFi7GCmrGpsuNNfj6hiz3M74xKAusErzdHBL4vM5Ye7rj2WvCgOm_YnwAtj9X4adwH1vaXoD_9sNw8StHf-XV3w0gehqsnobvZNwvlT5qnVOcxp0zhX6T-J17HYEXU-OFV0xG3jo_N5hk9hSkbNJ85X1OBRfhQLhOvB8uWCqQdznbazYQEaUlEhnPVXGzIuSvJXTydxy2YNxAeduiGnAd316a9b_ricua2IdIXRQa8DhKEoZ8xSElcSQi6EOk59ZrMz5F2SpRuEFu-_A3EH73c8Q-AMyN2dtVfxN3s2GvNXmjRS-LmiRTr0A
    // token_type=Bearer
    // expires_in=3600";
    
    
    console.log('current URL 👉️', href)
    console.log('current props 👉️', props)

    let { 
      auth, 
      parsedUrl 
    } = props;
    
    parsedUrl({ auth, href })
  },[]);

  return (

    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${router.basePath}/favicon.ico`} />
      </Head>

      <main className={styles.main}>

        <div style={{ display: "flex", flex: 0.1, flexDirection: "row", backgroundColor: "transparent" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 0.5, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
            <div>
              <h1 style={headingStyles}>
                Congratulations
                <br />
                <span style={headingAccentStyles}>— you just made a NextJs site! </span>
                <span role="img" aria-label="Party popper emojis">
                  🎉🎉🎉
                </span>
              </h1>
            </div>
            <div>
              <p style={paragraphStyles}>
                <code style={codeStyles}>
                  It's OK to struggle. It's not ok to give up.
                  <span role="img" aria-label="Sunglasses smiley emoji">
                    😎
                  </span>
                </code>
              </p>
            </div>

          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 0.5, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
            <div>
              <Image
                preview={false}
                width={500}
                src={IMAGE_URL}
              />
            </div>
          </div>
        </div>

        {/* <div style={{ padding: "3rem" }}>
          <main>
            <h1>List of Tennis GrandSlam Champions with 20 titles</h1>
            <ul>
              {champions.map((item) => (
                <li key={item.slug}>
                  <Link href={`/champions/${item.slug}`}>
                    <a>{item.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </main>
        </div> */}


        <div style={{ display: "flex", flex: 0.9, flexDirection: "row", backgroundColor: "transparent" }}>
          <div style={{ padding: 20, flex: 1 }}>
            <h1>
              Click below button to get data from Dynamo DB
            </h1>
            <div style={{ marginTop: 20 }}>
              <Button type="primary" loading={dynamoDB_Data_loader} onClick={_dynamoDB_onClick}>
                Query
              </Button>
            </div>
            <div style={{ marginTop: 20, padding: 10, borderWidth: 1, borderColor: "black" }}>
              <DynamicReactJson src={dynamoDB_Data} />
            </div>
          </div>
        </div>


      </main>

      <footer className={styles.footer}>
        <a>
          Powered by{' '}
          <span className={styles.logo}>
            <Image src={`${router.basePath}/vercel.svg`} alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

// This gets called at build time
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  // const championData = { data: "test", timestamp: (new Date()).toUTCString() };

  const dataState = store.getState();

  store.dispatch(END);
  await store.sagaTask.toPromise()

  // Pass data to the page via props
  return { props: dataState };
})

// export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
//   const dataState = store.getState();
//   console.log("dataState: ", dataState)
//   store.dispatch(END);
//   await store.sagaTask.toPromise()

//   return {
//     props: {
//       dataState
//     }
//   };
// })


export default RoutingPage
