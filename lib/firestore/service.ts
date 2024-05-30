import { getFirestore, collection, getDocs, getDoc, doc, query, where, WhereFilterOp, collectionGroup, addDoc, writeBatch, setDoc } from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
   const snapshot = await getDocs(collection(firestore, collectionName));

   const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
   }));

   return data;
}

export async function retrieveDataByDocId(collectionName: string, docId: string) {
   const snapshot = await getDoc(doc(firestore, collectionName, docId));
   const data = snapshot.data();
   return data;
}

export async function retrieveDataByFields(collectionName: string, conditions: { field: string; operator?: WhereFilterOp; value: string }[]) {
   let q = query(collection(firestore, collectionName));

   conditions.forEach(condition => {
      const { field, operator = "==", value } = condition;
      q = query(q, where(field, operator, value));
   });

   const snapshot = await getDocs(q);
   const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
   }));

   return data;
}

export async function retrieveDataSubByFields(mainCollectionName: string, subCollectionName: string, conditions: { field: string; operator?: WhereFilterOp; value: string }[]) {
   const data: Record<string, any>[] = [];

   const mainCollectionSnapshot = await getDocs(collection(firestore, mainCollectionName));

   for (const mainDoc of mainCollectionSnapshot.docs) {
      let q = query(collection(mainDoc.ref, subCollectionName));

      conditions.forEach(condition => {
         const { field, operator = "==", value } = condition;
         q = query(q, where(field, operator, value));
      });

      const subCollectionSnapshot = await getDocs(q);

      subCollectionSnapshot.forEach(doc => {
         data.push({
            mainDocId: mainDoc.id,
            subDocId: doc.id,
            ...doc.data(),
         });
      });
   }

   return data;
}

export async function retrieveDataSubByDocId(collectionName: string, docId: string, subCollectionName: string) {
   const subCollectionRef = await getDocs(collection(firestore, collectionName, docId, subCollectionName));

   const data = subCollectionRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
   }));

   return data;
}

export async function retrieveDataWithSub(collectionName: string, subCollectionName: string) {
   const data: Record<string, any> = {};

   // Mendapatkan semua dokumen dari koleksi utama "questions"
   const mainCollectionSnapshot = await getDocs(collection(firestore, collectionName));

   // Iterasi setiap dokumen dalam koleksi utama
   for (const mainDoc of mainCollectionSnapshot.docs) {
      // Mendapatkan nama category dari dokumen utama
      const category = mainDoc.id;

      // Mendapatkan referensi ke subkoleksi "questions" di setiap dokumen utama
      const subCollectionRef = collection(mainDoc.ref, subCollectionName);
      // Mendapatkan semua dokumen dari subkoleksi "questions"
      const subCollectionSnapshot = await getDocs(subCollectionRef);

      // Menyiapkan array untuk menyimpan pertanyaan-pertanyaan untuk tiap category
      const questions: Record<string, any>[] = [];

      // Iterasi setiap dokumen dalam subkoleksi "questions"
      subCollectionSnapshot.docs.map(doc => {
         // Di definisikan manual per field agar berurutan
         const questionData = doc.data();

         questions.push({
            id: doc.id,
            question: questionData.question,
            options: questionData.options,
            answer: questionData.answer,
         });
      });

      // Menyimpan array pertanyaan dalam category tertentu ke dalam objek data
      data[category] = questions;
   }

   return data;
}

export async function addDocument(collectionName: string, data: any) {
   data.created_at = new Date().toISOString();
   data.updated_at = new Date().toISOString();

   return await addDoc(collection(firestore, collectionName), data);
}

export async function addManyDocuments(collectionName: string, dataArray: any[]) {
   const batch = writeBatch(firestore);

   dataArray.forEach(data => {
      data.created_at = new Date().toISOString();
      data.updated_at = new Date().toISOString();

      const docRef = doc(collection(firestore, collectionName));
      batch.set(docRef, data);
   });

   return batch
      .commit()
      .then(() => {
         console.log("Documents added successfully to collection:", collectionName);
         return true;
      })
      .catch(error => {
         console.error("Error adding documents to collection:", error);
         throw error;
      });
}

export async function addDocumentToSubCollection(collectionName: string, docId: string, subCollectionName: string, data: any) {
   const questionsRef = collection(doc(firestore, collectionName, docId), subCollectionName);

   return await addDoc(questionsRef, data);
}

export async function addManyDocumentToSubCollection(collectionName: string, docId: string, subCollectionName: string, data: any[]) {
   const batch = writeBatch(firestore);

   const questionsRef = collection(doc(firestore, collectionName, docId), subCollectionName);

   data.map(data => {
      const newDocRef = doc(questionsRef);
      batch.set(newDocRef, data);
   });

   await batch
      .commit()
      .then(() => {
         console.log("Documents added successfully to collection");
         return true;
      })
      .catch(error => {
         console.error("Error adding documents to collection:", error);
         throw error;
      });
}

export async function addDocumentToSubCollectionWithFixedId(collectionName: string, docId: string, subCollectionName: string, subDocId: string, data: any) {
   const subCollectionRef = collection(doc(firestore, collectionName, docId), subCollectionName);
   const subDocRef = doc(subCollectionRef, subDocId);

   return await setDoc(subDocRef, data);
}


/**
 *
 * @deprecated the method is not stable
 */
export async function retrieveDataSub(subCollectionName: string) {
   const querySnapshot = await getDocs(collectionGroup(firestore, subCollectionName));

   const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
   }));

   return data;
}
