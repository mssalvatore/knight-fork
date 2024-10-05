RelativeCoordinates = Chessboard.RelativeCoordinates
// Fork types targets (x, y)
//
// (±1, ±1)
// (0, ±2) OR (±2, 0)
// (±1, ±3) OR (±3, ±1)
// (0, ±4) OR (±4, 0)
// (±2, ±4) OR (±4, ±2)
// (±3, ±3)
//

const fork_map = new Map();
fork_map.set(new RelativeCoordinates(-1, -1).toString(), [new RelativeCoordinates(-2, 1), new RelativeCoordinates(1, -2)])
fork_map.set(new RelativeCoordinates(-1, 1).toString(), [new RelativeCoordinates(-2, -1), new RelativeCoordinates(1, 2)])
fork_map.set(new RelativeCoordinates(1, -1).toString(), [new RelativeCoordinates(-1, -2), new RelativeCoordinates(2, 1)])
fork_map.set(new RelativeCoordinates(1, 1).toString(), [new RelativeCoordinates(-1, 2), new RelativeCoordinates(2, -1)])

fork_map.set(new RelativeCoordinates(-2, 0).toString(), [new RelativeCoordinates(-1, 2), new RelativeCoordinates(-1, -2)])
fork_map.set(new RelativeCoordinates(0, -2).toString(), [new RelativeCoordinates(-2, -1), new RelativeCoordinates(2, -1)])
fork_map.set(new RelativeCoordinates(0, 2).toString(), [new RelativeCoordinates(-2, 1), new RelativeCoordinates(2, 1)])
fork_map.set(new RelativeCoordinates(2, 0).toString(), [new RelativeCoordinates(1, -2), new RelativeCoordinates(1,2)])

fork_map.set(new RelativeCoordinates(-3, -1).toString(), [new RelativeCoordinates(-2, 1), new RelativeCoordinates(-1, -2)])
fork_map.set(new RelativeCoordinates(-3, 1).toString(), [new RelativeCoordinates(-2, -1), new RelativeCoordinates(-1, 2)])
fork_map.set(new RelativeCoordinates(-1, -3).toString(), [new RelativeCoordinates(-2, -1), new RelativeCoordinates(1, -2)])
fork_map.set(new RelativeCoordinates(-1, 3).toString(), [new RelativeCoordinates(-2, 1), new RelativeCoordinates(1, 2)])
fork_map.set(new RelativeCoordinates(1, -3).toString(), [new RelativeCoordinates(-1, -2), new RelativeCoordinates(2, -1)])
fork_map.set(new RelativeCoordinates(1, 3).toString(), [new RelativeCoordinates(-1, 2), new RelativeCoordinates(2, 1)])
fork_map.set(new RelativeCoordinates(3, -1).toString(), [new RelativeCoordinates(1, -2), new RelativeCoordinates(2, 1)])
fork_map.set(new RelativeCoordinates(3, 1).toString(), [new RelativeCoordinates(1, 2), new RelativeCoordinates(2, -1)])

fork_map.set(new RelativeCoordinates(-4, 0).toString(), [new RelativeCoordinates(-2, -1), new RelativeCoordinates(-2, 1)])
fork_map.set(new RelativeCoordinates(0, -4).toString(), [new RelativeCoordinates(-1, -2), new RelativeCoordinates(1, -2)])
fork_map.set(new RelativeCoordinates(0, 4).toString(), [new RelativeCoordinates(-1, 2), new RelativeCoordinates(1, 2)])
fork_map.set(new RelativeCoordinates(4, 0).toString(), [new RelativeCoordinates(2, -1), new RelativeCoordinates(2, 1)])

fork_map.set(new RelativeCoordinates(-4, -2).toString(), [new RelativeCoordinates(-2, -1)])
fork_map.set(new RelativeCoordinates(-4, 2).toString(), [new RelativeCoordinates(-2, 1)])
fork_map.set(new RelativeCoordinates(-2, -4).toString(), [new RelativeCoordinates(-1, -2)])
fork_map.set(new RelativeCoordinates(-2, 4).toString(), [new RelativeCoordinates(-1, 2)])
fork_map.set(new RelativeCoordinates(2, -4).toString(), [new RelativeCoordinates(1, -2)])
fork_map.set(new RelativeCoordinates(2, 4).toString(), [new RelativeCoordinates(1, 2)])
fork_map.set(new RelativeCoordinates(4, -2).toString(), [new RelativeCoordinates(2, -1)])
fork_map.set(new RelativeCoordinates(4, 2).toString(), [new RelativeCoordinates(2, 1)])

fork_map.set(new RelativeCoordinates(-3, -3).toString(), [new RelativeCoordinates(-2, -1), new RelativeCoordinates(-1, -2)])
fork_map.set(new RelativeCoordinates(-3, 3).toString(), [new RelativeCoordinates(-2, 1), new RelativeCoordinates(-1, 2)])
fork_map.set(new RelativeCoordinates(3, -3).toString(), [new RelativeCoordinates(1, -2), new RelativeCoordinates(2, -1)])
fork_map.set(new RelativeCoordinates(3, 3).toString(), [new RelativeCoordinates(1, 2), new RelativeCoordinates(2, 1)])

window['Chessboard']['KnightForkMap'] = fork_map;
