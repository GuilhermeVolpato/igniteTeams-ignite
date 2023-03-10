import { FlatList, Alert } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Container } from "./styles";
import { Loading } from "@components/Loading";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { groupsGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('NewGroup');
  }

  async function fetchGroups(){
    try{
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
      
    }catch(error){
      console.log(error)
      Alert.alert('Erro', 'Não foi possível carregar as turmas')
    } finally{
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate('Players', {group});
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  },[]));

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      {isLoading ? <Loading />:
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard 
              title={item} 
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Nenhuma turma encontrada, que tal cadastrar a primeira turma?" />
          )}
        />
      }

      <Button 
        title="Criar nova turma"
        onPress={handleNewGroup}
      />
    </Container>
  );
}
