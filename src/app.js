const OpenAI = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedChunks(chunks) {
    const result = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: chunks,
    });

    embeddings = result.data.map(d => d.embedding)
    const docs = chunks.map((text, i) => ({
        id: `doc-${i}`,
        text,
        embedding: embeddings[i]
    }));

    return docs;
}



async function embedQuery(query) {
    const result = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: query,
    });

    return result.data.map(d => d.embedding);
}

module.exports = { embedChunks, embedQuery };