const puppeteer = require('puppeteer');

async function setupPuppeteer() {
  console.log('🔧 Configurando Puppeteer...');
  
  try {
    // Força o download do Chromium se necessário
    console.log('📥 Verificando Chromium...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    console.log('✅ Chromium configurado com sucesso!');
    await browser.close();
    
    console.log('🚀 Puppeteer está pronto para uso!');
  } catch (error) {
    console.error('❌ Erro ao configurar Puppeteer:', error.message);
    process.exit(1);
  }
}

setupPuppeteer(); 