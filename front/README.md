# 📘 Mini Documentação Técnica — Sistema de Avaliação de Mobilidade com PoseNet

## 🧩 Visão Geral

Este sistema tem como objetivo realizar **avaliações de mobilidade humana em tempo real utilizando apenas a webcam do usuário**. Toda a lógica de detecção de pose e avaliação é executada no frontend, sem necessidade de backend, oferecendo uma solução **leve, acessível e facilmente escalável**.

---

## 🚀 Tecnologias Utilizadas

### React.js

**Função:** Estrutura base da interface do usuário e lógica da aplicação.  
**Justificativa:** Framework moderno para construção de Single Page Applications (SPAs), com componentização eficiente, excelente performance e uma comunidade madura que facilita o desenvolvimento rápido e escalável.

### Zustand

**Função:** Gerenciamento global de estado para controle de dados como resultados da pose, estado da câmera, entre outros.  
**Justificativa:** Biblioteca leve e reativa que dispensa boilerplate, oferecendo uma alternativa minimalista ao Redux, ideal para aplicações com lógicas de estado simples e desempenho crítico.

### OpenCV.js

**Função:** Pré-processamento de imagens capturadas da webcam (como redimensionamento, rotação ou filtragem) antes da análise com o modelo de pose.  
**Justificativa:** Versão em JavaScript da poderosa biblioteca OpenCV, permite aplicar operações clássicas de visão computacional diretamente no navegador, sem necessidade de backend ou bibliotecas pesadas.

### TensorFlow.js + PoseNet

**Função:** Detecção de poses humanas (17 keypoints) a partir do vídeo da webcam em tempo real.  
**Justificativa:** Permite a execução local de modelos de Machine Learning diretamente no navegador, eliminando a necessidade de envio de dados sensíveis ao servidor (privacidade por design) e garantindo resposta em tempo real. PoseNet foi escolhido por ser leve, compatível com dispositivos modestos e simples de usar.

### Vercel

**Função:** Hospedagem e deploy contínuo da aplicação React com CDN global.  
**Justificativa:** Plataforma de deploy altamente otimizada para aplicações frontend, com integração nativa com repositórios Git, builds automáticos, suporte a preview environments e distribuição por CDN para reduzir latência e melhorar a experiência do usuário.

---

## 🤖 Modelo de Pose: PoseNet

O **PoseNet** é um modelo de estimativa de pose baseado em redes neurais convolucionais (CNNs), que detecta **17 pontos-chave do corpo humano**, como joelhos, ombros, quadris e punhos. O modelo está otimizado para rodar diretamente em navegadores modernos utilizando TensorFlow.js.

### 📚 Referência Técnica

- **Paper base:**  
  Zhe Cao et al., _Realtime Multi-Person 2D Pose Estimation using Part Affinity Fields_, CVPR 2017  
  [https://arxiv.org/abs/1611.08050](https://arxiv.org/abs/1611.08050)

- **Repositório do Modelo (TensorFlow.js):**  
  [https://github.com/tensorflow/tfjs-models/tree/master/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)

---

## ⚠️ Limitações e Considerações

- Desempenho limitado em dispositivos com hardware fraco (ex: celulares antigos).
- Detecção de poses apenas em 2D, sem profundidade (sem suporte para análise 3D).
- Sensível à iluminação, obstruções e má qualidade da câmera.

---

## 📈 Potenciais Melhorias Futuras

- Criação de backend para:
    - Armazenamento de séries temporais de movimentações.
    - Geração de relatórios automáticos.
- Inclusão de inteligência artificial para **correção postural automática**.
- Substituição do PoseNet por modelos mais modernos como:
    - **MoveNet** (mais rápido e preciso)
    - **BlazePose** (mais completo e com suporte 3D)

---

## 🔗 Fontes Adicionais

- [PoseNet - TensorFlow.js](https://www.tensorflow.org/js/models?hl=pt-br#posenet)
- [MoveNet - TensorFlow Blog](https://blog.tensorflow.org/2021/05/accelerating-pose-estimation-with-movenet.html)
- [BlazePose - MediaPipe](https://google.github.io/mediapipe/solutions/pose.html)
