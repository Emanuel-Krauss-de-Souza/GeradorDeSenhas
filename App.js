import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import telaInicial from './src/views/telaInicial';
import historicoSenhas from './src/views/historicoSenhas';
import Login from './src/views/login';
import cadastro from './src/views/cadastro';
import Toast from 'react-native-toast-message';
import './src/service/interceptor';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="telaInicial" component={telaInicial} options={{ headerShown: false }} />
        <Stack.Screen name="historico" component={historicoSenhas} options={{ headerShown: false }} />
        <Stack.Screen name="cadastro" component={cadastro} options={{ headerShown: false }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
