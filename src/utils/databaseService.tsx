import { db } from "@/config/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const fetchFarmGallery = async () => {
  const docRef = doc(db, "settings", "gallery");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { status: true, res: { ...docSnap.data(), id: docSnap.id } };
  } else {
    // docSnap.data() will be undefined in this case
    return { status: false };
  }
};

export const fetchCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  let arr: any = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr.push({ ...doc.data(), id: doc.id });
    console.log(arr);
    
  });

  return JSON.parse(JSON.stringify(arr));
};
export const fetchSubCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "subCategories"));
  let arr: any = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr.push({ ...doc.data(), id: doc.id });
  });
  return JSON.parse(JSON.stringify(arr));
  // const q = query(collection(db, "subCategories"), where("categories", "==", true));
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
};
