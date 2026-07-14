// import { useState } from "react";

// function Navbar({ user, loggedIn }) {
//   return (
//     <nav>
//       <p>Logged In: {loggedIn.toString()}</p>
//       {loggedIn ? (
//         <p>Hello, {user.name}! What are we doing today?</p>
//       ) : (
//         <p>Login or Register to Proceed.</p>
//       )}
//     </nav>
//   );
// }

function Navbar({ user, logout }) {
  return (
    <nav>
      {user ? (
        <>
          <p>Logged In</p>
          <button onClick={logout}>Log Out</button>
          <p>Hello, {user.name}! What are we doing today?</p>
        </>
      ) : (
        <button>Log In</button>
      )}
    </nav>
  );
}

export default Navbar;
