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

function Navbar({ user }) {
  return (
    <nav>
      {user ? (
        <>
          <p>Logged In</p>
          <p>Hello, {user.name}! What are we doing today?</p>
        </>
      ) : (
        <p>Logged Out</p>
      )}
    </nav>
  );
}

export default Navbar;
