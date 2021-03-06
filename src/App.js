import {useEffect, useRef} from "react";

import {Grid} from "@material-ui/core";

import {PushToTalkButton, PushToTalkButtonContainer, ErrorPanel} from "@speechly/react-ui";
import  {useSpeechContext} from "@speechly/react-client";


import Details from "./components/Details/Details";
import Main from "./components/Main/Main";

import useStyles from "./AppStyles";

function App ()
{
  const connection = navigator.onLine
  console.log(connection)

  const classes = useStyles();
  const {clientState} = useSpeechContext();
  const main = useRef();

  const executeScroll = () => main.current.scrollIntoView();

  useEffect(() => {
    if (clientState === 12) {
      executeScroll();
    }
  }, [clientState]);

  return (
		<>
			<Grid
				className={classes.grid}
				container
				spacing={0}
				alignItems='center'
				justifyContent='center'
				style={{height: "100vh"}}>
				<Grid item xs={12} sm={4} className={classes.mobile}>
					<Details title='Income' />
				</Grid>
				<Grid ref={main} item xs={12} sm={3} className={classes.main}>
					<Main />
				</Grid>
				<Grid item xs={12} sm={4} className={classes.desktop}>
					<Details title='Income' />
				</Grid>
				<Grid item xs={12} sm={4} className={classes.last}>
					<Details title='Expense' />
				</Grid>
				{connection && (
					<PushToTalkButtonContainer>
						<PushToTalkButton />
						<ErrorPanel />
					</PushToTalkButtonContainer>
				)}
			</Grid>
		</>
	);
}

export default App;
