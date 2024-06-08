"use client";

import { FC, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { KanbanColumn } from "./KanbanColumn";
import { CandidateCard } from "./CandidateCard";

interface Candidate {
  id: string;
  name: string;
  profileUrl: string;
  rating: number;
  avatarUrl: string;
}

interface CandidatesState {
  candidates: Candidate[];
  triagem: Candidate[];
  desafioTecnico: Candidate[];
  entrevista: Candidate[];
  contratado: Candidate[];
}

const initialCandidates: CandidatesState = {
  candidates: [
    {
      id: "1",
      name: "Rafael Silva",
      profileUrl: "#",
      rating: 4.5,
      avatarUrl: "https://via.placeholder.com/40",
    },
    {
      id: "2",
      name: "Maria Oliveira",
      profileUrl: "#",
      rating: 4.7,
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "3",
      name: "Carlos Santos",
      profileUrl: "#",
      rating: 4.3,
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "4",
      name: "Ana Paula",
      profileUrl: "#",
      rating: 4.6,
      avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: "5",
      name: "João Pereira",
      profileUrl: "#",
      rating: 4.4,
      avatarUrl: "https://randomuser.me/api/portraits/men/18.jpg",
    },
    {
      id: "6",
      name: "Fernanda Lima",
      profileUrl: "#",
      rating: 4.8,
      avatarUrl: "https://randomuser.me/api/portraits/women/85.jpg",
    },
    {
      id: "7",
      name: "Pedro Costa",
      profileUrl: "#",
      rating: 4.2,
      avatarUrl: "https://randomuser.me/api/portraits/men/66.jpg",
    },
    {
      id: "8",
      name: "Juliana Mendes",
      profileUrl: "#",
      rating: 4.9,
      avatarUrl: "https://randomuser.me/api/portraits/women/78.jpg",
    },
  ],
  triagem: [],
  desafioTecnico: [],
  entrevista: [],
  contratado: [],
};

export const KanbanBoard: FC = () => {
  const [candidates, setCandidates] =
    useState<CandidatesState>(initialCandidates);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    const sourceItems = Array.from(
      candidates[source.droppableId as keyof CandidatesState]
    );
    const destinationItems = Array.from(
      candidates[destination.droppableId as keyof CandidatesState]
    );
    const [movedItem] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, movedItem);

    setCandidates((prev) => ({
      ...prev,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destinationItems,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4 overflow-x-auto">
        <KanbanColumn
          id="candidates"
          title="Candidatos"
          count={candidates.candidates.length}
          color="inherit"
        >
          {candidates.candidates.map((candidate, index) => (
            <CandidateCard key={candidate.id} index={index} {...candidate} />
          ))}
        </KanbanColumn>
        <KanbanColumn
          id="triagem"
          title="Triagem"
          count={candidates.triagem.length}
          color="inherit"
        >
          {candidates.triagem.map((candidate, index) => (
            <CandidateCard key={candidate.id} index={index} {...candidate} />
          ))}
        </KanbanColumn>
        <KanbanColumn
          id="desafioTecnico"
          title="Desafio técnico"
          count={candidates.desafioTecnico.length}
          color="#333333"
        >
          {candidates.desafioTecnico.map((candidate, index) => (
            <CandidateCard key={candidate.id} index={index} {...candidate} />
          ))}
        </KanbanColumn>
        <KanbanColumn
          id="entrevista"
          title="Entrevista"
          count={candidates.entrevista.length}
          color="#FFA500"
        >
          {candidates.entrevista.map((candidate, index) => (
            <CandidateCard key={candidate.id} index={index} {...candidate} />
          ))}
        </KanbanColumn>
        <KanbanColumn
          id="contratado"
          title="Contratado"
          count={candidates.contratado.length}
          color="#008000"
        >
          {candidates.contratado.map((candidate, index) => (
            <CandidateCard key={candidate.id} index={index} {...candidate} />
          ))}
        </KanbanColumn>
      </div>
    </DragDropContext>
  );
};
