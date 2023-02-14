
import { FlatList, Alert, TextInput } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState("")

  const navigation = useNavigation();
  const route = useRoute(); 
  const { group } = route.params as RouteParams;

  const newPlayerNameIputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0){
      return Alert.alert("Novo jogador", "Digite o nome do jogador")
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try{
      await playerAddByGroup(newPlayer, group)

      newPlayerNameIputRef.current?.blur()

      setNewPlayerName("")
      fetchPlayersByTeam();

    } catch(error) {
      if(error instanceof AppError){
        Alert.alert('Nova pessoa', error.message)
      }else{
        console.log(error)
        Alert.alert('Nova pessoa', 'não foi possível adicionar a pessoa')
      }
    }
  
  }

  async function fetchPlayersByTeam() {
    try{
      setIsLoading(true)
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
      
    }catch(err){
      console.log(err)
      Alert.alert('Erro', 'Não foi possível carregar os players do time')
    }finally{
      setIsLoading(false)
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try{
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    }catch(err){
      console.log(err)
      Alert.alert('Erro', 'Não foi possível remover o player')
    }
  }

  async function groupRemove(){
    try{
      await groupRemoveByName(group);
      navigation.navigate('Groups')
    }catch(err){
      console.log(err)
      Alert.alert('Erro', 'Não foi possível remover o grupo')
    }
  }

  async function handleRemoveGroup() {
    Alert.alert(
      'Remover Time',
      'Deseja remover a Turma?',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => groupRemove()}
      ]
    );
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton/>
      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />
      <Form>
        <Input
          inputRef={newPlayerNameIputRef}
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon 
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>
      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}  
            />
          )}
          horizontal
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>
      {
        isLoading ? <Loading /> :
        <FlatList 
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Não há players cadastrados nesse time" 
          />
        )}
        contentContainerStyle={[
          {paddingBottom: 100},
          players.length === 0 && {flex: 1}
        ]} 
        />
      }
      
      <Button
        title="Remover Turma"
        type="secondary"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
// final da lista mais longe do final da tela, ficar mais nitido que acabou a lista