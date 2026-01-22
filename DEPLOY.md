# Guia de Deploy - APK para Google Play

Este guia explica como gerar o APK da PWA "Meu Carrinho de Compras" para publicação na Google Play Store.

## Pré-requisitos

1. **Node.js** >= 18
2. **Java JDK** >= 11 (para assinatura do APK)
3. **Android SDK** (ou Android Studio instalado)

## Passo 1: Deploy da PWA no Firebase

Primeiro, faça deploy da versão mais recente da PWA:

```bash
# Build da aplicação
npm run build

# Deploy no Firebase (se ainda não configurou o Firebase CLI)
npm install -g firebase-tools
firebase login
firebase deploy
```

A PWA estará disponível em: https://my-shop-cart.web.app

## Passo 2: Configurar Digital Asset Links

Para que o TWA funcione corretamente (sem barra de URL), você precisa criar o arquivo `.well-known/assetlinks.json`:

1. Após gerar a keystore no Passo 3, pegue o SHA-256 fingerprint:
```bash
keytool -list -v -keystore android-keystore.jks -alias meu-carrinho
```

2. Crie o arquivo `src/.well-known/assetlinks.json`:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.my_shop_cart.app",
    "sha256_cert_fingerprints": ["SEU_SHA256_AQUI"]
  }
}]
```

3. Adicione `.well-known` aos assets no `angular.json` e faça redeploy.

## Passo 3: Gerar o APK com Bubblewrap

### Instalação do Bubblewrap

```bash
npm install -g @nicktaras/pwa-to-apk
# ou
npx @nicktaras/pwa-to-apk@latest
```

### Usando PWABuilder (Alternativa Recomendada)

A forma mais fácil é usar o PWABuilder online:

1. Acesse https://www.pwabuilder.com/
2. Cole a URL: `https://my-shop-cart.web.app`
3. Clique em "Start" e depois em "Package for stores"
4. Selecione "Android" e configure:
   - Package ID: `com.my_shop_cart.app`
   - App name: `Meu Carrinho de Compras`
   - App short name: `Meu Carrinho`
5. Faça download do APK

### Usando Bubblewrap CLI (Configurado para JDK 17)

Detectamos que seu sistema usa **Java 25**, o que causa erro no Bubblewrap. Jà configurei o arquivo `~/.bubblewrap/config.json` para usar seu **JDK 17** (`~/.sdkman/candidates/java/17.0.17-tem`) e uma pasta local para o Android SDK.

Para finalizar a geração do APK:

1. **Baixar o Android SDK** (Interativo):
   Execute este comando e responda "Yes" para instalar o SDK e aceitar as licenças.
   ```bash
   bubblewrap init --manifest twa-manifest.json
   ```

2. **Gerar o APK**:
   ```bash
   bubblewrap build
   ```
   **Nota**: Quando perguntar a senha da keystore, use: `password`

3. O APK assinado estará na pasta do projeto (`app-release-signed.apk`).

## Passo 4: Testar o APK

### No Emulador Android
```bash
# Listar dispositivos disponíveis
adb devices

# Instalar o APK
adb install app-release-signed.apk
```

### No Dispositivo Físico
1. Habilite "Fontes desconhecidas" nas configurações
2. Transfira o APK para o dispositivo
3. Abra o arquivo APK para instalar

## Passo 5: Publicar na Google Play

1. Acesse o [Google Play Console](https://play.google.com/console)
2. Crie um novo aplicativo
3. Preencha as informações:
   - Nome: Meu Carrinho de Compras
   - Descrição curta: Gerencie sua lista de compras
   - Screenshots: Capture telas do app
   - Ícone: Use `/assets/icons/icon-512x512.png`
4. Faça upload do AAB (Android App Bundle) ou APK
5. Envie para revisão

## Notas Importantes

- **Keystore**: Guarde a keystore (`android-keystore.jks`) em local seguro. Você precisará dela para todas as atualizações futuras.
- **Digital Asset Links**: Sem este arquivo configurado, o app mostrará a barra de URL do Chrome.
- **Versioning**: Atualize `appVersionCode` e `appVersionName` no `twa-manifest.json` para cada release.

## Preparação para iOS (Futuro)

O app já está preparado para iOS com as meta tags necessárias no `index.html`. Para publicar na App Store, você precisará:

1. Criar um projeto iOS com Capacitor ou gerar via PWABuilder
2. Ter uma conta de desenvolvedor Apple ($99/ano)
3. Seguir o processo de revisão da Apple

---

## Estrutura de Arquivos Gerados

```
smartshopcart/
├── twa-manifest.json       # Configuração do Bubblewrap
├── android-keystore.jks    # Keystore para assinatura (gerado)
├── src/
│   ├── manifest.json       # Web App Manifest atualizado
│   ├── ngsw-config.json    # Configuração do Service Worker
│   ├── index.html          # Com meta tags iOS
│   └── assets/icons/       # Ícones em todos os tamanhos
└── dist/                   # Build de produção
```
