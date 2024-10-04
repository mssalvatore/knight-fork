var clicked_squares = [];
var correct_squares = [];

function toggleSelection(element, color) {
    if (element.style.boxShadow === "") {
        let blur = Math.floor(parseInt(element.style.width, 10) / 5);
        let spread = Math.floor(blur/ 2);
        element.style.boxShadow = `0 0 ${blur}px ${spread}px `+ color + " inset";
    } else {
        element.style.opacity = 1.0;
        element.style.boxShadow = "";
    }
}
function onMouseclickSquare (evt, square) {
    square_name = square.getAttribute("data-square")
    const index = clicked_squares.indexOf(square_name);
    if (index >= 0) {
        clicked_squares.splice(index, 1);
    }
    else {
        clicked_squares.push(square_name);
    }
    toggleSelection(square, "#e6c912");
}

function onContextmenuSquare (evt, square) {
    toggleSelection(square, "#FF0000")
}

function verify() {
    if (clicked_squares.sort().join(",") == correct_squares.sort().join(",")) {
        alert("Correct!");
        location.reload();
    } else {
        alert("Incorrect!");
    }
}
// Fork types targets (x, y)
//
// (±1, ±1)
// (0, ±2) OR (±2, 0)
// (±1, ±3) OR (±3, ±1)
// (0, ±4) OR (±4, 0)
// (±2, ±4) OR (±4, ±2)
// (±3, ±3)
//
// Forks
//
//
class RelativeCoordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}
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
//
//

// Pawns are the least likely. Kings are the most likely (more or less).
const target_pieces = ["P", "R", "R", "N", "N", "B", "B", "Q", "Q", "K", "K", "K","K"];
const target_pieces_no_king= ["R", "N", "B", "Q"];
const target_color = ["w", "b"];

function square_add(square, relative) {
    return String.fromCharCode(square.charCodeAt(0) + relative.x) + (parseInt(square[1], 10) + relative.y);
 }

function get_square_name(file, rank) {
    return file + rank;
}

function get_enemy_coordinates() {
    var rank1 = Math.ceil(Math.random() * 8);
    var file_index_1 = Math.floor(Math.random() * 8)
    var file1 = files[file_index_1];

    var rank2 = rank1;
    var file2 = file1;

    while (rank2 == rank1 && file2 == file1) {
        rank2 = Math.ceil(Math.random() * 8);
        file_index_2 = Math.floor(Math.random() * 8)
        file2 = files[file_index_2];
    }

    return [file1, file_index_1, rank1, file2, rank2];
}

$(document).on("keypress", function(evt) {
    if (evt.which === 13) {
        verify();
    }
});

var config = {
    draggable: false,
    position: {},
    onContextmenuSquare: onContextmenuSquare,
    onMouseclickSquare: onMouseclickSquare
}
var board1 = ChessBoard('board1', config);
var files = "abcdefgh";

const [file1, file_index_1, rank1, file2, rank2] = get_enemy_coordinates();
const square_1_name = get_square_name(file1, rank1);
const square_2_name = get_square_name(file2, rank2);
const square_1 = $('*[data-square="' + square_1_name + '"]')[0]
const square_2 = $('*[data-square="' + square_2_name + '"]')[0]

const color = target_color[Math.floor(Math.random() * target_color.length)]
const piece_1 = target_pieces[Math.floor(Math.random() * target_pieces.length)]
const piece_2 = target_pieces_no_king[Math.floor(Math.random() * target_pieces_no_king.length)]

var position = {
    [square_1_name]:  color + piece_1,
    [square_2_name]: color + piece_2
}

board1.position(position);

enemy_relationship = new RelativeCoordinates(file_index_2 - file_index_1, rank2 - rank1);

const fork_positions = fork_map.get(enemy_relationship.toString()) || [];

fork_positions.forEach((potential_position) => {
    potential_square = square_add(square_1_name, potential_position);
    if (ChessBoard.validSquare(potential_square)) {
        //toggleRed($('*[data-square="' + potential_square + '"]')[0]);
        correct_squares.push(potential_square);
    }
});


