// https://www.youtube.com/watch?v=I8W-4oq1onY


const {VertexAI} = require('@google-cloud/vertexai');

/**
 * TODO(developer): Update these variables before running the sample.
 */
async function createStreamChat(
  projectId = 'gen-lang-client-0668296192',
  location = 'us-central1',
  model = 'gemini-pro'
) {
  // Initialize Vertex with your Cloud project and location
  const vertexAI = new VertexAI({project: projectId, location: location});

  // Instantiate the model
  const generativeModel = vertexAI.preview.getGenerativeModel({
    model: model,
  });


  const chat = generativeModel.startChat({});
  const chatInput1 = 'How can I learn more about real estate?';

  console.log(`User: ${chatInput1}`);

  const result1 = await chat.sendMessageStream(chatInput1);
  for await (const item of result1.stream) {
    console.log(item.candidates[0].content.parts[0].text);
  }
}

createStreamChat();