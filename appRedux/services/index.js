export const Service = async (domain='', path=null, { method='', payload={}, authorization=null }) => {
  try {
    // console.info('Service Request', { method, domain, path, payload, authorization });
    
    if(!path) {
      throw Error(`Undefined path:${path}`);
    }

    let headers = {
      'Content-Type'  : 'application/json'
    }
    
    if (authorization){
      headers['Authorization'] = authorization;
    }

    if (method == 'GET' || method == 'DELETE') {
      var response = await fetch(`${domain}/${path}`,{
        method,
        headers
      })
    } else if (method == 'POST' || method == 'PUT') {
      var reqBody = JSON.stringify(payload);
      var response = await fetch(`${domain}/${path}`,{
        method,
        headers,
        body: reqBody
      })
    }

    if(!response.ok){
      throw await response.json();
    }

    let responseBody = await response.json();
    return responseBody;
  } 
  catch (error) {
    console.error(`Service Error`,{ path:`${domain}/${path}`, error });
    throw error;
  }

}