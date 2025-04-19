export default defineEventHandler(async (event) => {
    const ip =
      getHeader(event, 'x-forwarded-for')?.split(',')[0] ||
      event.node.req.socket.remoteAddress;
  
    // const ip = '197.238.3.1' // TN
    // const ip = '81.17.122.173' // IN
    // const ip = '185.213.83.41' // ID
    // const ip = '212.97.71.99' // PH
    
    if (!ip) return;
  
    try {
      const res : any = await $fetch(`https://ipinfo.io/${ip}?token=a300f6b25b7f23`);
      if (res) {
        setCookie(event, 'country', res.country); // e.g. 'IN'
      }
    } catch (err) {
      console.warn('Geo lookup failed', err);
      setCookie(event, 'country', 'US'); // fallback
    }
  });
  