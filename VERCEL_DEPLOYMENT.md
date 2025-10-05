# Guide de Déploiement Vercel

## Configuration de l'API OpenAI

### Étape 1: Obtenir une clé API OpenAI

1. Visitez https://platform.openai.com/api-keys
2. Connectez-vous à votre compte OpenAI
3. Cliquez sur "Create new secret key"
4. Copiez la clé générée (vous ne pourrez plus la voir après)

### Étape 2: Déployer sur Vercel

1. Si ce n'est pas déjà fait, connectez votre compte GitHub à Vercel
2. Importez ce repository dans Vercel
3. Vercel détectera automatiquement la configuration

### Étape 3: Configurer les Variables d'Environnement

1. Dans le tableau de bord Vercel, allez dans votre projet
2. Cliquez sur "Settings" → "Environment Variables"
3. Ajoutez une nouvelle variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Votre clé API OpenAI (obtenue à l'étape 1)
   - **Environments**: Cochez "Production", "Preview", et "Development"
4. Cliquez sur "Save"

### Étape 4: Redéployer

1. Retournez à l'onglet "Deployments"
2. Cliquez sur "Redeploy" sur le dernier déploiement
3. Attendez que le déploiement soit terminé

### Étape 5: Tester

1. Visitez votre site Vercel (ex: https://votre-projet.vercel.app)
2. Vous devriez voir:
   - Le fond étoilé animé
   - L'interface avec le halo doré
   - Le score d'étoiles (0/100)
   - La zone de question à l'IA
3. Posez une question à l'IA
4. Vérifiez que vous recevez une vraie réponse (pas une erreur)
5. Vérifiez que votre score augmente de 5 points

## Résolution des Problèmes

### L'IA ne répond pas

**Erreur**: "Configuration serveur manquante"
- **Cause**: La variable `OPENAI_API_KEY` n'est pas configurée
- **Solution**: Suivez l'étape 3 ci-dessus

**Erreur**: "La clé API OpenAI semble invalide"
- **Cause**: La clé API est incorrecte ou expirée
- **Solution**: Vérifiez votre clé API sur https://platform.openai.com/api-keys

**Erreur**: "Trop de requêtes"
- **Cause**: Limite de taux OpenAI dépassée
- **Solution**: Attendez quelques instants avant de réessayer

### Le fond étoilé ne s'affiche pas

- Vérifiez que les fichiers JavaScript sont chargés correctement
- Ouvrez la console du navigateur pour voir les erreurs
- Vérifiez que le canvas est présent dans le DOM

### Le score ne se sauvegarde pas

- Vérifiez que localStorage est activé dans votre navigateur
- Certains navigateurs en mode privé désactivent localStorage

## Structure des Fichiers

```
English-Avator/
├── api/
│   ├── chat.js           # Redirige vers openai.js
│   └── openai.js         # Fonction serverless OpenAI
├── src/
│   ├── App.js            # Application principale
│   └── components/
│       ├── StarParticles.js  # Fond étoilé animé
│       └── HomeInfo.js       # Interface avec score
├── index.html            # Page principale
├── README.md             # Documentation
└── TESTS.md              # Tests et validations
```

## Coûts OpenAI

- Modèle utilisé: `gpt-3.5-turbo`
- Coût approximatif: ~$0.002 pour 1000 tokens
- Une conversation typique = 100-500 tokens
- Surveillez votre usage sur https://platform.openai.com/usage

## Support

Pour toute question ou problème:
1. Vérifiez la console du navigateur pour les erreurs
2. Vérifiez les logs Vercel pour les erreurs serveur
3. Consultez la documentation OpenAI: https://platform.openai.com/docs
