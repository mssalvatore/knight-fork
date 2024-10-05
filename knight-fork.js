RelativeCoordinates = Chessboard.RelativeCoordinates

const config = {
    draggable: false,
    position: {},
    onContextmenuSquare: onContextmenuSquare,
    onMouseclickSquare: onMouseclickSquare
}
const files = "abcdefgh";
// Pawns are the least likely. Kings are the most likely (more or less).
const target_pieces = ["P", "R", "R", "N", "N", "B", "B", "Q", "Q", "K", "K", "K", "K", "K"];
const target_pieces_no_king = ["R", "N", "B", "Q"];
const target_color = ["w", "b"];

var clicked_squares = [];
var correct_squares = [];

const board1 = ChessBoard('board1', config);

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
    let square_name = square.getAttribute("data-square")
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
        location.reload();
    } else {
        alert("Incorrect!");
    }
}

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
    if (evt.which === 13 || evt.which === 99) {
        verify();
    }
});

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

const fork_positions = Chessboard.KnightForkMap.get(enemy_relationship.toString()) || [];

fork_positions.forEach((potential_position) => {
    potential_square = square_add(square_1_name, potential_position);
    if (ChessBoard.validSquare(potential_square)) {
        //toggleRed($('*[data-square="' + potential_square + '"]')[0]);
        correct_squares.push(potential_square);
    }
});


