// src/components/Carrinho.jsx
import React, { useState } from 'react';

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const [mensagem, setMensagem] = useState('');
  const [descontosUsados, setDescontosUsados] = useState([]); // Rastreia descontos usados

  // Produtos pré-definidos
  const produtos = [
    { id: 1, nome: 'Produto A', preco: 10 },
    { id: 2, nome: 'Produto B', preco: 20 },
    { id: 3, nome: 'Produto C', preco: 30 },
    { id: 4, nome: 'Produto D', preco: 40 },
    { id: 5, nome: 'Produto E', preco: 50 },
  ];

  // Função para adicionar um produto ao carrinho
  const adicionarAoCarrinho = (produto) => {
    const itemExistente = carrinho.find((item) => item.id === produto.id);

    if (itemExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }

    setTotal(total + produto.preco);
    setMensagem(`"${produto.nome}" adicionado ao carrinho!`);
    setTimeout(() => setMensagem(''), 3000); // Remove a mensagem após 3 segundos
  };

  // Função para remover um produto do carrinho
  const removerDoCarrinho = (id) => {
    const itemRemovido = carrinho.find((item) => item.id === id);
    setCarrinho(carrinho.filter((item) => item.id !== id));
    setTotal(total - itemRemovido.preco * itemRemovido.quantidade);
    setMensagem(`"${itemRemovido.nome}" removido do carrinho!`);
    setTimeout(() => setMensagem(''), 3000); // Remove a mensagem após 3 segundos
  };

  // Função para aplicar desconto
  const aplicarDesconto = (codigo) => {
    if (descontosUsados.includes(codigo)) {
      setMensagem('Este código de desconto já foi utilizado!');
      setTimeout(() => setMensagem(''), 3000);
      return;
    }

    if (codigo === 'DESC10') {
      setTotal(total * 0.9);
      setMensagem('Desconto de 10% aplicado!');
      setDescontosUsados([...descontosUsados, codigo]); // Marca o código como usado
    } else if (codigo === 'DESC20') {
      setTotal(total * 0.8);
      setMensagem('Desconto de 20% aplicado!');
      setDescontosUsados([...descontosUsados, codigo]); // Marca o código como usado
    } else {
      setMensagem('Código de desconto inválido!');
    }
    setTimeout(() => setMensagem(''), 3000); // Remove a mensagem após 3 segundos
  };

  return (
    <div className="container">
      <h1>Loja Online</h1>
      {mensagem && <div className="mensagem">{mensagem}</div>}
      <div className="produtos">
        {produtos.map((produto) => (
          <div key={produto.id} className="card">
            <h3>{produto.nome}</h3>
            <p>R$ {produto.preco.toFixed(2)}</p>
            <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar</button>
          </div>
        ))}
      </div>

      <div className="carrinho">
        <h2>Carrinho</h2>
        {carrinho.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Preço Unitário</th>
                  <th>Subtotal</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carrinho.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.quantidade}</td>
                    <td>R$ {item.preco.toFixed(2)}</td>
                    <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                    <td>
                      <button onClick={() => removerDoCarrinho(item.id)}>Remover</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total: R$ {total.toFixed(2)}</h3>
            <div className="desconto">
              <input
                type="text"
                id="codigoDesconto"
                placeholder="Código de Desconto"
              />
              <button
                onClick={() =>
                  aplicarDesconto(document.getElementById('codigoDesconto').value)
                }
              >
                Aplicar Desconto
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carrinho;