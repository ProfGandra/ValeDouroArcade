# ValeDouroArcade — Game Design

## Visão geral
Spin-off web de ValeDouro em formato arcade side-scroller de ação, inspirado no ritmo de run-and-gun clássicos, mas com identidade própria do universo ValeDouro. Estética prevista em pixel art retrô, preferencialmente 16-bit/arcade, executado no navegador e separado do ValeDouroWEBIA.

## Elenco principal
- **Mauricius** — guerreiro humano equilibrado; espada longa + escudo; especial defensivo.
- **Cassandra Arven** — guerreira elfa e comandante; combate técnico com lâmina e arco; especial de comando da Companhia de Arcos.
- **Aurus** — Ranger; possui dois estilos escolhidos antes da missão: Lâmina ou Arco.
- **Brokk Pedra-Funda** — anão, Capitão da Guarda Profunda; combatente pesado com machado/escudo; especial de carga de tropa de choque.

## Patrícia e a bolsa impossível
Patrícia não é personagem jogável principal. Ela aparece em pontos específicos das fases trazendo suprimentos especiais numa bolsa obrigatoriamente pequena.

Regra canônica do Arcade:
- os itens retirados da bolsa podem ser absurdamente maiores do que a bolsa;
- a impossibilidade física nunca é explicada;
- os personagens podem reagir visualmente;
- Aurus tende a tentar entender a bolsa; Patrícia nunca deixa;
- a bolsa pode conter itens improváveis, inclusive uma tocha acesa.

Exemplos de suprimentos:
- Mauricius: escudo reforçado ou espada de duas mãos;
- Cassandra: equipamento de guerra élfico;
- Aurus: tocha para incendiar as próprias flechas;
- Brokk: martelo de guerra gigantesco.

## Especiais

### Mauricius — Formar Linha!
Especial defensivo, utilizável **uma única vez por cenário/fase**.
- Mauricius chama lanceiros.
- Falas sugeridas: **“Lanceiros!”** e **“Formar linha!”**.
- Os homens formam uma linha defensiva com escudos e lanças à frente dele.
- A formação segura/reppele infantaria e reduz ou bloqueia ataques frontais.
- Cavalos não são feridos; podem empinar, assustar-se e recusar a carga/fugir.
- Enquanto Mauricius permanecer atrás da linha, recupera gradualmente parte do HP.
- Se abandonar a proteção, a regeneração para.
- Em eventual coop, os demais podem aproveitar a proteção física, mas só Mauricius recupera HP.

### Cassandra Arven — Saraivada
Especial recarregável por barra.
- Cassandra está narrativamente à frente da Companhia de Arcos.
- **Os arqueiros nunca aparecem na tela.**
- Cassandra assume postura de comando e diz: **“Arqueiros prontos!”**
- Pequena pausa; pode-se ouvir arcos sendo tensionados ao fundo.
- Cassandra ordena: **“LANÇAR!”**
- Só então dezenas de flechas entram pelo alto da tela e atingem a área à frente dela.
- O efeito começa à frente de Cassandra, reforçando que é fogo coordenado real, não magia.
- Inimigos podem reagir no breve intervalo: olhar para cima, erguer escudos ou tentar correr.

### Aurus — Vantagem do Terreno
Especial recarregável por barra.
- Aurus sobe rapidamente para um ponto elevado adequado ao cenário: árvore, telhado, muralha, rocha, ruína, torre etc.
- Permanece lá por X segundos.
- Continua sob controle do jogador e dispara com arco.
- Não é invulnerabilidade mágica: a infantaria corpo a corpo em geral não o alcança.
- Arqueiros, criaturas voadoras e ameaças especiais ainda podem atingi-lo.
- O especial usa as flechas reais da aljava.

### Brokk — Carga de GranBerg
Especial recarregável por barra.
- Aproximadamente 6–10 anões entram marchando em formação disciplinada e se posicionam atrás de Brokk.
- Brokk ergue a arma e grita: **“POR GRANBERG!”**
- Os anões respondem com um brado.
- Brokk ordena: **“CARGA!”**
- Eles então saem **correndo** contra os inimigos.
- Ao colidirem com infantaria, a ação vira uma grande nuvem/bloco de poeira em movimento, com humor arcade e onomatopeias como **POW! TUM! CRASH! POC!**
- Capacetes, escudos etc. podem surgir de dentro da nuvem.
- A carga é potencialmente letal para infantaria comum e pode quebrar/atordoar infantaria pesada.
- Contra cavalaria, o cavalo se assusta, relincha/empina e foge; evitar ferir o animal.
- Contra chefes, causa dano e stagger, mas não elimina automaticamente.

## Aurus — estilos de jogo

### Estilo Lâmina
- Escolhido antes da missão.
- Espada como arma principal.
- Combate corpo a corpo completo, rápido e móvel.
- O especial continua usando arco, independentemente do estilo escolhido.

### Estilo Arco
- Escolhido antes da missão.
- Arco como arma principal.
- Mira pelo mouse.
- Flechas são finitas.
- **20 flechas no início da missão.**
- **30 flechas de capacidade máxima** com uma aljava.
- Adaga como arma secundária permanente.
- Ao chegar a 0 flechas, Aurus saca a adaga.
- Flechas extras são encontradas nas fases em caixas/estoques coerentes com o cenário.
- **Patrícia nunca fornece flechas.**
- A tocha de Patrícia permite incendiar as flechas normais disponíveis; a tocha pode ser fincada no chão.
- Flechas incendiárias são particularmente úteis contra Ressurgidos.
- A tocha não cria munição.

### Segunda aljava
Aurus pode encontrar uma segunda aljava rara.
- Capacidade total sobe de 30 para **45 flechas**.
- Não dobra para 60.
- A segunda aljava deve aparecer visualmente no personagem.
- A penalidade principal é **salto menor**, por causa do peso extra.
- Pode haver pequena perda de velocidade de corrida, a ajustar em playtest.
- O especial contextual de subir para terreno elevado não é bloqueado pela penalidade de salto.
- A segunda aljava pode ser descartada para recuperar mobilidade.

## Mira e controles
Diretriz inicial:
- WASD: movimento
- Mouse: direção/mira
- Clique esquerdo: ataque principal
- Espaço: salto
- Teclas adicionais para secundário, especial e interação serão fechadas em implementação.
- Aurus com arco pode usar mira livre pelo mouse e física de trajetória/quebra de distância conforme playtest.

## Estrutura de campanha e morte
- **Morreu, morreu.**
- Não há continue tradicional.
- A própria fase é o checkpoint.
- Se um personagem morrer no meio da fase, o jogador reinicia **a mesma fase** com outro personagem disponível.
- O personagem derrotado fica indisponível pelo restante daquela run/campanha.
- Se todos forem derrotados, fim da campanha.
- Uma nova campanha restaura o elenco.

## Troca entre fases, cansaço e recuperação
Ao terminar uma fase, o jogador pode manter o personagem ou trocá-lo.

Mensagem-base:
**“A missão terminou. Deseja manter o personagem ou trocar?”**

Se estiver muito desgastado, a interface pode sugerir descanso.

### Descanso
- Personagens fora da ação recuperam HP conforme fases não jogadas.
- O HP carrega entre fases.
- A quantidade exata de recuperação será balanceada em playtest.
- O jogador pode interromper o descanso e selecionar o personagem novamente antes da recuperação completa.

### Tratamento obrigatório
- Se o HP ficar **menor ou igual a 20%**, o personagem **não pode continuar na próxima fase**.
- Ele é levado para a barraca médica e fica indisponível até recuperar um nível seguro.
- HP = 0 significa derrotado; tratamento não ressuscita personagens.

## Barraca médica
A cena é mostrada **somente pelo lado de fora da barraca**.
- O personagem ferido entra.
- A aba fecha.
- O curador dá uma bronca no personagem lá dentro.
- A barraca pode balançar e objetos/equipamentos podem ser jogados para fora.
- O humor vem do áudio e da reação externa, sem mostrar o interior.
- Exemplo de tom:
  - Mauricius insiste que consegue continuar; o curador responde que não.
  - Cassandra tenta argumentar que homens aguardam suas ordens.
  - Aurus pode tentar escapar discretamente e ser chamado de volta.
  - Brokk minimiza o ferimento e recebe uma bronca.
- Regra de tom: **ninguém discute com o curador.**

## Identidade mecânica do quarteto
- **Mauricius** = defesa e recuperação.
- **Cassandra** = comando e ataque de área.
- **Aurus** = precisão, terreno, mobilidade e gestão de munição.
- **Brokk** = força, resistência e tropa de choque.

## Direção visual
- Pixel art retrô com resolução suficiente para expressões e animações.
- Preferência atual: estética **16-bit/arcade**, em vez de 8-bit literal.
- Humor visual exagerado é permitido, preservando o cânone e a seriedade do universo fora do exagero arcade.

## Próximo passo recomendado
Construir um protótipo de gameplay com:
1. seleção de personagem;
2. movimento e salto;
3. ataque básico;
4. HP;
5. um inimigo simples;
6. câmera lateral;
7. reinício da fase com outro personagem após derrota.

Depois validar sensação de jogo antes de expandir fases, especiais e arte definitiva.
