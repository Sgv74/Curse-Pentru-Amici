export function getRank(totalRaces: number) {

  if (totalRaces >= 20) {

    return {
      title: "🏆 Cel Mai Mare Amic",
      color: "text-yellow-400",
    };

  }

  if (totalRaces >= 15) {

    return {
      title: "👑 Amicul Suprem",
      color: "text-purple-400",
    };

  }

  if (totalRaces >= 10) {

    return {
      title: "🤝 Amic",
      color: "text-blue-400",
    };

  }

  if (totalRaces >= 5) {

    return {
      title: "🍺 Amicuț",
      color: "text-green-400",
    };

  }

  return {
    title: "🥬 Prietenaș",
    color: "text-zinc-400",
  };

}