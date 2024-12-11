"use client";
//Use Effect
// "use client";

// import { useEffect, useState } from "react";
// import InputText from "../InputText";
// import Button from "../Latihan2";
// const Home = () => {
//   let [count, setCount] = useState(0);
//   let [text, setText] = useState("");
//   let [change, setChange] = useState(false);
//   useEffect(() => {
//     setCount((c) => c + 1);
//     console.log("UseEffect Berjalan");
//   },[text]);
//   return (
//     <>
//       <div className="text-lg">{count}</div>
//       <InputText
//         value={text}
//         id="text"
//         name="text"
//         onChange={(e) => {
//           setText(e.target.value)
//         }}
//       />

//       <Button
//         title="Ubah Count"
//         colorSchema="red"
//         variant="solid"
//         onClick={() => {
//           setChange(!change)
//           console.log(change);
//         }}
//       />

//     </>
//   )
// };
// export default Home;

//UseCallBack
// "use client";
// import { useEffect, useState, memo, useCallback } from "react";
// import InputText from "..Latihan1";
// import Button from "../Latihan2";
// import Link from "next/link";
// import User from "../module/User";

// const Home = () => {
//   const [users, setUser] = useState<string[]>(['Yasa', 'Rayya', 'Disayidan']);
//   const [text, setText] = useState<string>('');

//   const handleDelete = useCallback(
//     (index:number) => {
//       setUser((user) => {
//         user.splice(index,1);
//         return[...user]
//       })
//     },
//     []
//   );

//   const handleAddUser = () => {
//     if(text !== '') {
//       setUser((user) => {
//         return [...user,text]
//       });
//       setText("");
//     } else {
//       alert("Masukkan Nama pengguna terlebih dahulu!");
//     }
//   };

//   return (
//     <section className="space-y-5">
//       <User
//         users={users}
//         handleDelete={handleDelete}
//       />
//       <InputText
//         placeholder="ketik"
//         id="text"
//         name="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <Button
//         title="tambah"
//         colorSchema="blue"
//         onClick={handleAddUser}
//       />
//     </section>
//   );
// };
// export default Home;

// "use client";
// import { useEffect, useState, memo, useCallback, useMemo } from "react";
// import InputText from "../Latihan1";
// import Button from "..Latihan2";
// import Link from "next/link";
// import User from "../module/User";

// const Home = () => {
//   const [users, setUser] = useState<string[]>(["Yasa", "Rayya", "Disayidan"]);
//   const [text, setText] = useState<string>("");

//   const handleDelete = useCallback((index: number) => {
//     setUser((user) => {
//       user.splice(index, 1);
//       return [...user];
//     });
//   }, []);

//   const handleAddUser = () => {
//     if (text !== "") {
//       setUser((user) => {
//         return [...user, text];
//       });
//       setText("");
//     } else {
//       alert("Masukkan Nama pengguna terlebih dahulu!");
//     }
//   };

//   const result = useMemo(() => {
//     console.log("Perhitungan Berjalan");

//     let i = 0;
//     while (i < 200000000) i++;

//     console.log(i);
//     return users;
//   }, [users]);

//   return (
//     <section className="space-y-5">
//       <User users={result} handleDelete={handleDelete} />
//       <InputText
//         placeholder="ketik"
//         id="text"
//         name="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <Button title="tambah" colorSchema="blue" onClick={handleAddUser} />
//     </section>
//   );
// };
// export default Home;

//UseRef

// import { useRef } from "react";
// import Button from "../components/Latihan2";
// import InputText from "../components/Latihan1";

// const App = () => {
//   const targetAbout = useRef<HTMLDivElement>(null);
//   const targetHome = useRef<HTMLDivElement>(null);
//   const targetContent = useRef<HTMLDivElement>(null);

//   const scrollToHome = () => {
//     console.log('content', targetHome);
//     if (targetHome.current) {
//       targetHome.current.classList.add('text-3xl')
//       targetHome.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   const scrollToContent = () => {
//     console.log('content', targetContent);
//     if(targetContent.current) {
//       targetContent.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   const scollToAbout = () => {
//     console.log('content', targetAbout);
//     if(targetAbout.current) {
//       const node = document.createElement("div");
//       node.className = "text-white bg-red-500 p-2"
//       const textnode = document.createTextNode("water");
//       node.appendChild(textnode);
//       targetAbout.current.appendChild(node);

//       targetAbout.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   return (
//     <section className="h-screen w-screen">
//       <nav className="h-[50px]">
//       <Button
//           onClick={scrollToHome}
//           colorSchema="blue"
//           variant="solid"
//           title="Home"
//         />
//         <Button
//           onClick={scrollToContent}
//           colorSchema="red"
//           variant="solid"
//           title="Content"
//         />
//         <Button
//           onClick={scollToAbout}
//           colorSchema="green"
//           variant="solid"
//           title="About"
//         />
//       </nav>
//       <section className="h-[90%] overflow-auto">
//         <div
//           ref={targetHome}
//           className="min-h-screen bg-red-500 flex items-center justify-center"
//         >
//           <h1 className="text-white">Home </h1>
//         </div>
//         <div
//           ref={targetContent}
//           className="min-h-screen bg-blue-500 flex items-center justify-center"
//         >
//           <h1 className="text-white">Content </h1>
//         </div>
//         <div
//           ref={targetAbout}
//           className="min-h-screen bg-yellow-500 flex items-center justify-center"
//         >
//           <h1 className="text-white">About </h1>
//         </div>
//       </section>
//     </section>
//   )
// };
// export default App

//Custom Hook

// import { useRef, useState } from "react";
// import Button from "../components/Latihan2";

// const Home = () => {
//   let [isOpen, setIsOpen] = useState<boolean>(false);

//   const onOpen = () => {
//     setIsOpen(!isOpen)
//   };

//   const onClose = () => {
//     setIsOpen(false)
//   };

//   return (
//     <section className="h-screen w-screen space-y-5">
//       <Button onClick={onOpen} colorSchema="blue" title="open"/>
//       <Button onClick={onClose} colorSchema="red" title="close"/>

//       {isOpen ? <p>Open</p>  : <p>Close</p>}

//     </section>
//   )

// }
// export default Home;

// import { useRef, useState } from "react";
// import Button from "../components/Latihan2";
// import { useClosure } from ".";

// const App = () => {
//   const { isOpen, onOpen, onClose } = useClosure();

//   return (
//     <section className="h-screen w-screen space-y-5">
//       <Button onClick={onOpen} colorSchema="blue" title="open" />
//       <Button onClick={onClose} colorSchema="red" title="closed" />
//       {isOpen ? <p>Open</p> : <p>Close</p>}
//     </section>
//   );
// };
// export default App;
