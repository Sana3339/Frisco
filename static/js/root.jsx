const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;

//"use strict";

function Homepage() {
  return <div> Welcome to my site!</div>
};

function About() {
  return <div> A tiny react demo site </div>
};

 function Login(props) {
   return (
     <div>
       Username:
       <input type="text"></input>
       Password:
       <input type="text"></input>
       <button> Login </button>
     </div>
   );
 }

function PostListItem(props) {
  return <li>{props.title}</li>
}

function CreatePost(props) {
  //This is what we need to send as JSON:
  //#{"post_title": "post_1", "post_body": "stuff"}
  //Below is a 'fully controlled form'

  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')

  //this is how you give server information:
  const makePost = () => {
    const post = {"post_title": title, "post_body": body}
    fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify(post)
    })
    // This is an example of conditionally rendering based on response
    // .then(response => response.json())
    // .then(data => {
    //  if (data === 'not ok') {
    //    alert('post title already taken')
    //  }
    // })
  }

  return (
    // normally this would be a form instead of just a div. Then I'd need to 'preventDefault'
    <div>
      Title:
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)}
        value={title}  
      />
      Body:
      <textarea 
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      <button onClick={makePost} > Make A Post </button>
    </div>
  )
}

function PostList(props) {

  //get info from server
  //make components out of it
  //render them

  const [topPostList, setTopPostList] = React.useState(["loading..."])

  React.useEffect(() => {
    fetch('/api/top-posts')
    .then(response => response.json())
    .then((data) => {
      const postList = []
      for (const post of data) {
        postList.push(<PostListItem title={post.title}/>);
      }
      setTopPostList(postList)
   })
  }, [])

  return (
    <div>
      <ul>
        {topPostList}
      </ul>
    </div>
  );
}  


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to="/about"> About </Link>
            </li>
            <li>
              <Link to="/login"> Login </Link>
            </li>
            <li>
              <Link to="/top-posts"> Top Posts </Link>
            </li>
            <li>
              <Link to="/create-post"> Create Post </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path ="/create-post">
            <CreatePost />
          </Route>
          <Route path ="/top-posts">
            <PostList />
          </Route>
          <Route path ="/login">
            <Login />
          </Route>
          <Route path ="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
