# Configuration OpenAI pour English Avatar

## Configuration de la clé API OpenAI sur Vercel

Pour que l'avatar Eumonia1 fonctionne avec l'IA OpenAI, vous devez configurer la clé API dans les variables d'environnement de Vercel.

### Étapes de configuration :

1. **Obtenir une clé API OpenAI** :
   - Visitez https://platform.openai.com/api-keys
   - Créez un nouveau projet si nécessaire
   - Générez une nouvelle clé API secrète
   - Copiez la clé (elle commence par `sk-...`)

2. **Configurer la variable d'environnement sur Vercel** :
   - Allez dans votre projet Vercel : https://vercel.com/dashboard
   - Sélectionnez le projet `English-Avator`
   - Cliquez sur "Settings" dans le menu du haut
   - Sélectionnez "Environment Variables" dans le menu de gauche
   - Ajoutez une nouvelle variable :
     - **Name** : `OPENAI_API_KEY`
     - **Value** : Votre clé API OpenAI (sk-...)
     - **Environment** : Sélectionnez `Production`, `Preview`, et `Development`
   - Cliquez sur "Save"

3. **Redéployer votre application** :
   - Retournez à l'onglet "Deployments"
   - Cliquez sur les trois points (...) à côté du dernier déploiement
   - Sélectionnez "Redeploy"
   - Confirmez le redéploiement

### Vérification

Une fois configuré et redéployé :
- Visitez votre site Vercel
- Posez une question à l'avatar Eumonia1
- Vous devriez recevoir une réponse générée par l'IA au lieu d'un message d'erreur

### Messages d'erreur possibles

- **"⚠️ La clé API OpenAI n'est pas configurée"** : La variable d'environnement n'est pas définie dans Vercel
- **"❌ Erreur d'authentification OpenAI"** : La clé API est invalide ou a expiré
- **"⏳ Trop de requêtes"** : Vous avez dépassé le quota de l'API OpenAI
- **"❌ Erreur lors de la génération de la réponse IA"** : Erreur générale de l'API OpenAI

### Sécurité

⚠️ **IMPORTANT** : Ne jamais committer votre clé API OpenAI dans le code source. Utilisez toujours les variables d'environnement de Vercel.

### Coûts

L'utilisation de l'API OpenAI est payante. Le modèle `gpt-3.5-turbo` utilisé dans cette application est l'un des moins chers. Consultez https://openai.com/pricing pour les tarifs actuels.
