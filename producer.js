import { kafka } from "./client.js";

async function init(params) {
  
    const producer =  kafka.producer();
    console.log("connecting producer");
    await producer.connect();
    console.log("connected to kafka");
    

    //sending message
    
    await producer.send(
        {
            partition:0,
            topic:"rider-updates",
             messages: [
        { key: 'location-update', value: JSON.stringify({name:"ramesh" , loc : "lucknow"} ) },
      
    ],
                
        }
    )
    await producer.disconnect();

}
init().catch(console.error);