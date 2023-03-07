const OPENAI_API_KEY = process.env.API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const  prompt  = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      //TEN EN CUENTA GENERAR TITULOS IDEAS DE COMIDAS SÓLO CON LOS INGREDIENTES BRINDADOS, YA QUE NO CUENTO CON OTROS INGREDIENTES EXTRAS A LOS QUE MENCIONÉ.
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt:
        prompt?.qty === 0 && prompt?.type === 'ingredients' ?
        `Responde como si fueras la inteligencia artificial conversacional ChatGPT. El usuario te escribe un/unos ingredientes y tú debes contestar de forma natural 6 titulos 
        ideas de comidas. El prompt es: ${prompt.prompt?.ingredients}.`
        :
        prompt?.type === 'ingredients'?
        `Sabiendo estos titulos de recetas: ${prompt.messages[1]?.message}. DIME la receta de la comida numero:${prompt.prompt?.ingredients} (máximo 1500 caracteres, receta simple paso a paso)`
        :
        prompt?.qty === 0 && prompt?.type === 'chat' ?
        `Quiero la receta de esta comida: ${prompt.prompt?.ingredients}. (máximo 1500 caracteres, receta simple paso a paso)`
        :
        `Sabiendo esto que me has mencionado: ${prompt.messages[1]?.message}. Respondeme esta consulta:${prompt.prompt?.ingredients}`
        ,
        temperature: 0.7,
        max_tokens: 700,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })

    if (!response.ok) {
      console.error(response.statusText)
      return res.status(500).json({ error: 'OpenAI API error' })
    }

    const json = await response.json()

    return res.status(200).json({ response: json.choices[0].text.trim() })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
}
