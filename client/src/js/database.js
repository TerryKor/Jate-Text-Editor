import { openDB } from "idb";
//initiate new indexDB "jate"
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");//readwrite to view and modify data
  const store = tx.objectStore("jate");
  const request = store.put({id:1, content: content});//there would be only one entry in object store and always get updated, thats why we need id =1  reffering to first entry
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all from the database");
  const jateDb = await openDB("jate", 1);//because there will by only 1 entry at a time we are getting id=1
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;

  if (result){
    return request ['content']
  }

  return '';
};

initdb();
