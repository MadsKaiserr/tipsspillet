module.exports = {
    getKupon: function(type,homeTeam,visitorTeam) {
        if (type === "3Way Result") {
            return "Kampresultat";
        } else if (type === "3Way Result 1st Half") {
            return "Kampresultat - 1. Halvleg";
        } else if (type === "3Way Result 2nd Half") {
            return "Kampresultat - 2. Halvleg";
        } else if (type === "Team To Score First") {
            return "Første målscorer";
        } else if (type === "Double Chance") {
            return "Dobbelt chance";
        } else if (type === "Double Chance - 1st Half") {
            return "Dobbelt chance - 1. halvleg";
        } else if (type === "Highest Scoring Half") {
            return "Flest mål i halvleg";
        } else if (type === "Both Teams To Score") {
            return "Begge hold scorer";
        } else if (type === "Clean Sheet - Home") {
            return "Clean sheet " + homeTeam;
        } else if (type === "Clean Sheet - Away") {
            return "Clean sheet " + visitorTeam;
        } else if (type === "Corner Match Bet") {
            return "Flest hjørnespark";
        } else if (type === "First Match Corner") {
            return "Første hjørnespark";
        } else if (type === "Last Match Corner") {
            return "Sidste hjørnespark";
        } else if (type === "Team To Score Last") {
            return "Sidste målscorer";
        } else if (type === "Odd/Even") {
            return "Lige/Ulige mål";
        } else if (type === "First Card Received") {
            return "Første kort";
        } else if (type === "A Red Card in the Match") {
            return "Rødt kort i kampen";
        } else if (type === "Both Teams To Receive A Card") {
            return "Begge hold modtager et kort";
        } else if (type === "Both Teams To Receive 2+ Cards") {
            return "Begge hold modtager 2+ kort";
        } else if (type === "Own Goal") {
            return "Selvmål";
        } else if (type.slice(0,-3) === "Over/Under") {
            return "Over/Under " + type.slice(10) + " mål";
        } else if (type.slice(0,-4) === "Over/Under") {
            return "Over/Under " + type.slice(10) + " mål";
        } else if (type === "Exact Goals Number") {
            return "Antal mål i kampen";
        } else if (type.slice(0,-3) === "Goals Over/Under 1st Half") {
            return "Over/Under " + type.slice(-3) + " mål - 1. Halvleg";
        } else if (type.slice(0,-4) === "Goals Over/Under 1st Half") {
            return "Over/Under " + type.slice(-4) + " mål - 1. Halvleg";
        } else if (type.slice(0,-3) === "Over/Under 2nd Half") {
            return "Over/Under " + type.slice(-3) + " mål - 2. Halvleg";
        } else if (type.slice(0,-4) === "Over/Under 2nd Half") {
            return "Over/Under " + type.slice(-4) + " mål - 2. Halvleg";
        }
    },
    getString: function(type,result,homeTeam,visitorTeam) {
        if (type === "3Way Result" || type === "3Way Result 1st Half" || type === "3Way Result 2nd Half") {
            if (result === "0") {
                return homeTeam;
            } else if (result === "1") {
                return "Uafgjort";
            } else if (result === "2") {
                return visitorTeam;
            }
        } else if (type === "Team To Score First" || type === "Team To Score Last") {
            if (result === "0") {
                return homeTeam;
            } else if (result === "1") {
                return "Ingen mål";
            } else if (result === "2") {
                return visitorTeam;
            }
        } else if (type === "First Card Received") {
            if (result === "0") {
                return homeTeam;
            } else if (result === "1") {
                return "Ingen kort";
            } else if (result === "2") {
                return visitorTeam;
            }
        } else if (type === "Corner Match Bet") {
            if (result === "0") {
                return homeTeam;
            } else if (result === "1") {
                return "Ingen hjørnespark";
            } else if (result === "2") {
                return visitorTeam;
            }
        } else if (type === "Double Chance" || type === "Double Chance - 1st Half") {
            if (result === "0") {
                return homeTeam + " eller uafgjort";
            } else if (result === "1") {
                return "Uafgjort eller " + visitorTeam;
            } else if (result === "2") {
                return homeTeam + " eller " + visitorTeam;
            }
        } else if (type === "Own Goal" || type === "Clean Sheet - Away" || type === "A Red Card in the Match" || type === "Clean Sheet - Home" || type === "Both Teams To Score" || type === "Both Teams To Receive A Card" || type === "Both Teams To Receive 2+ Cards") {
            if (result === "0") {
                return "Ja";
            } else if (result === "1") {
                return "Nej";
            }
        } else if (type === "Last Match Corner" || type === "First Match Corner") {
            if (result === "0") {
                return homeTeam;
            } else if (result === "1") {
                return visitorTeam;
            }
        } else if (type === "Odd/Even") {
            if (result === "0") {
                return "Lige";
            } else if (result === "1") {
                return "Ulige";
            }
        } else if (type === "Highest Scoring Half") {
            if (result === "0") {
                return "1. halvleg";
            } else if (result === "1") {
                return "2. halvleg";
            } else if (result === "2") {
                return "Uafgjort";
            }
        } else if (type.slice(0,-3) === "Over/Under") {
            if (result === "0") {
                return "Over";
            } else if (result === "1") {
                return "Under";
            }
        } else if (type.slice(0,-4) === "Over/Under") {
            if (result === "0") {
                return "Over";
            } else if (result === "1") {
                return "Under";
            }
        } else if (type === "Exact Goals Number") {
            if (result === "0") {
                return "0";
            } else if (result === "1") {
                return "1";
            } else if (result === "2") {
                return "2";
            } else if (result === "3") {
                return "3";
            } else if (result === "4") {
                return "4";
            } else if (result === "5") {
                return "5";
            } else if (result === "6") {
                return "6";
            } else if (result === "7") {
                return "7+";
            }
        } else if (type.slice(0,-3) === "Goals Over/Under 1st Half") {
            if (result === "0") {
                return "Over";
            } else if (result === "1") {
                return "Over";
            } else if (result === "2") {
                return "Over";
            } else if (result === "3") {
                return "Over";
            } else if (result === "4") {
                return "Over";
            } else if (result === "5") {
                return "Under";
            } else if (result === "6") {
                return "Under";
            } else if (result === "7") {
                return "Under";
            } else if (result === "8") {
                return "Under";
            } else if (result === "9") {
                return "Under";
            }
        } else if (type.slice(0,-4) === "Goals Over/Under 1st Half") {
            if (result === "0") {
                return "Over";
            } else if (result === "1") {
                return "Over";
            } else if (result === "2") {
                return "Over";
            } else if (result === "3") {
                return "Over";
            } else if (result === "4") {
                return "Over";
            } else if (result === "5") {
                return "Under";
            } else if (result === "6") {
                return "Under";
            } else if (result === "7") {
                return "Under";
            } else if (result === "8") {
                return "Under";
            } else if (result === "9") {
                return "Under";
            }
        } else if (type.slice(0,-3) === "Over/Under 2nd Half") {
            if (result === "0") {
                return "Over";
            } else if (result === "1") {
                return "Over";
            } else if (result === "2") {
                return "Over";
            } else if (result === "3") {
                return "Over";
            } else if (result === "4") {
                return "Over";
            } else if (result === "5") {
                return "Under";
            } else if (result === "6") {
                return "Under";
            } else if (result === "7") {
                return "Under";
            } else if (result === "8") {
                return "Under";
            } else if (result === "9") {
                return "Under";
            }
        } else if (type.slice(0,-4) === "Over/Under 2nd Half") {
            if (result === "0") {
                return "Over";
            } else if (result === "1") {
                return "Over";
            } else if (result === "2") {
                return "Over";
            } else if (result === "3") {
                return "Over";
            } else if (result === "4") {
                return "Over";
            } else if (result === "5") {
                return "Under";
            } else if (result === "6") {
                return "Under";
            } else if (result === "7") {
                return "Under";
            } else if (result === "8") {
                return "Under";
            } else if (result === "9") {
                return "Under";
            }
        }
    }
}