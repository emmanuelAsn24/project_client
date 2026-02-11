# 🔧 Guide de Debugging - Création de Tâches

## 📋 Problèmes Identifiés & Corrigés

### 1. ❌ **TodoCreate.jsx** - Manque de Validation
**Problème:** 
- Pas de feedback si `desc` est vide 
- Pas de vérification si `_id` existe
- Aucun affichage d'erreur utilisateur

**✅ Solution Appliquée:**
```jsx
// Validation du champ vide
if (!titre) {
  setErrorMsg('Task description cannot be empty!');
  return;
}

// Vérification de l'authentification
if (!_id) {
  setErrorMsg('User not authenticated. Please login again.');
  console.error('Error: No user ID found', { _id });
  return;
}
```

---

### 2. ❌ **taskSlice.js** - En-têtes d'authentification
**Problème:**
- Headers inconsistants: `Authorization: getToken()` (sans "Bearer")
- Pas de gestion d'erreur (rejectWithValue)
- Messages d'erreur pas assez explicites

**✅ Solution Appliquée:**
```javascript
// Avant ❌
headers: { Authorization: getToken() }

// Après ✅
headers: { Authorization: `Bearer ${token}` }

// Avec gestion d'erreur
async (payload, { rejectWithValue }) => {
  try {
    if (!token) {
      throw new Error('No authentication token found');
    }
    // ...
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
}
```

---

## 🧪 Comment Debugger dans le Navigateur

### Étape 1: Ouvrir la Console (F12)
1. Appuyez sur **F12** dans le navigateur
2. Allez à l'onglet **"Console"**
3. Observez les logs en temps réel

### Étape 2: Tester la Création de Tâche
1. Connectez-vous avec vos identifiants
2. Allez à la page `/home`
3. Entrez une description de tâche
4. Cliquez sur le bouton ou appuyez sur **Entrée**

### Étape 3: Lire les Logs

**Logs attendus en cas de SUCCÈS:**
```
Payload: {description: "My Task", owner: "user123"}
Fetching tasks for user: user123
Token present: true
Creating task with token: Present
Creating task with:
  {description: "Do something", owner: "user123"}
Task created successfully: {_id: "...", description: "...", owner: "...", completed: false}
```

**Logs en cas d'ERREUR:**
```
Error creating task: Unauthorized
// OU
Error creating task: No authentication token found
// OU
Error creating task: Invalid token
```

---

## 🔍 Onglets à Vérifier dans DevTools (F12)

### 1. **Console** (F12 → Console)
Recherchez:
- Messages rouges (erreurs)
- Logs de création de tâche
- Vérifiez si le token est présent

### 2. **Network** (F12 → Network)
1. Rafraîchissez la page
2. Créez une tâche
3. Cherchez la requête `POST /api/v1/tasks`
4. Cliquez dessus et allez à:
   - **Headers** → Vérifiez `Authorization: Bearer ...`
   - **Payload** → Vérifiez `{description, owner}`
   - **Response** → Vérifiez le statut (200 = OK, 401 = Non authentifié, 400 = Erreur)

### 3. **Application/Storage** (F12 → Application)
1. Allez à `Local Storage`
2. Vérifiez `http://localhost:3000`
3. Recherchez la clé `token`
4. La valeur doit contenir quelque chose comme: `eyJhbGc...`

---

## ✅ Checklist de Validation

### Avant de Soumettre une Tâche:
- [ ] Vous êtes connecté (page `/home` accessible)
- [ ] La page affiche "Home" ou contient TodoCreate
- [ ] Le champ input n'est pas désactivé (disabled)

### Après avoir soumis une Tâche:
- [ ] La console affiche: `Creating task with token: Present`
- [ ] L'onglet Network montre `POST /api/v1/tasks` avec status **200**
- [ ] Le header `Authorization: Bearer xxx` est présent
- [ ] La tâche apparaît dans la liste (ou un message d'erreur rouge)

---

## 🚨 Erreurs Courantes & Solutions

| Erreur dans Console | Cause | Solution |
|---|---|---|
| `No authentication token found` | Token pas en localStorage | Reconnectez-vous |
| `Invalid token` | Token expiré | Reconnectez-vous |
| `Unauthorized (401)` | Backend rejette le token | Vérifiez le format: `Bearer <token>` |
| `_id is undefined` | `connectedUser._id` manquant | Vérifiez que `getState()` retourne un utilisateur |
| **Rien ne se passe** | Redux store pas à jour | Vérifiez que Redux DevTools affiche l'action |

---

## 📢 Commandes de Test Utiles (Console)

### Vérifier le Token:
```javascript
localStorage.getItem('token')
// Doit retourner: "eyJhbGc..." (une longue chaîne)
```

### Vérifier Redux State:
```javascript
// Si vous avez Redux DevTools d'installé:
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
```

### Envoyer une Requête Manuelle:
```javascript
const token = localStorage.getItem('token');
fetch('http://localhost:3000/api/v1/tasks', {
  method: 'POST',
  headers: {
    'Authorization':token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    description: 'Test Task',
    owner: 'your-user-id'
  })
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err))
```

---

## 📝 Template de Rapport d'Erreur

Si vous rencontrez toujours un problème, utilisez ce template:

```
Framework: React 19
Méthode d'API: Axios
Comportement: [Décrivez exactement ce qui se passe]
Console Error: [Collez l'erreur exacte du F12 → Console]
Network Response: [Décrivez ce que vous voyez dans F12 → Network]
Redux State: [Décrivez l'état de connectedUser et status]
Token présent: [Oui/Non]
```

---

## 🔗 Fichiers Modifiés

1. [src/components/TodoCreate.jsx](src/components/TodoCreate.jsx) - Validation & feedback utilisateur
2. [src/redux/slices/taskSlice.js](src/redux/slices/taskSlice.js) - Gestion d'erreur cohérente
