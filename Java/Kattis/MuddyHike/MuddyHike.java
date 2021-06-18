package com.capgemini;


import java.util.Scanner;

class MuddyHike {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        boolean isFirstLine = true;
        int[][] graph = new int[0][];
        int maxRows = 0, rows = 0;
        int maxColumns = 0;
        while (sc.hasNextInt()) {
            if (isFirstLine) {
                maxRows = sc.nextInt();
                maxColumns = sc.nextInt();
                isFirstLine = false;
                graph = new int[maxRows][maxColumns];
                //As its first line to enter graph dimensions, skip further execution
                continue;
            }
            int columns = 0;
            //continue reading line until max columns are reached
            while (columns != maxColumns) {
                int num = sc.nextInt();
                graph[rows][columns] = num;
                columns++;
            }
            //If all required rows are inputted then do further processing
            if (++rows == maxRows) {
                MuddyHike problem = new MuddyHike();
                problem.followDjikstraRoute(graph, maxRows, maxColumns);
                // Now reset all variables for next input
                isFirstLine = true;
                maxRows = maxColumns = rows = 0;
                graph = new int[0][];
            }
        }

    }

    /**
     * This method calculates shortest route for given graph and then returns vertex with max weight
     * @param array
     * @param maxRows
     * @param maxColumns
     */
    private void followDjikstraRoute(int[][] array, int maxRows, int maxColumns) {
        int[] route = new int[1000]; //Added enough room for large route
        int routeCount = 0;
        int column = 0;
        int row = 0;
        /*Find min position where Liam can start*/
        for (int i = 0; i < array.length; i++) {
            if (array[i][0] < array[0][0]) {
                route[routeCount++] = (array[i][0]);
                row = i;
            }
        }
        int tempRow = row;
        int tempColumn = column;
        while (column != maxColumns - 1) {
            /*Make this cell unusable for next iteration*/
            array[row][column] = Integer.MAX_VALUE;
            /*Start depth at initial coordinates*/
            int depth = array[row][column];
            //Check to your bottom
            if (row < maxRows - 1) {
                depth = array[row + 1][column];
                tempRow = row + 1;
                tempColumn = column;
            }
            //Check to your top
            if (row > 0 && array[row - 1][column] < depth) {
                depth = array[row - 1][column];
                tempRow = row - 1;
                tempColumn = column;
            }
            //Check to your right
            if (array[row][column + 1] < depth) {
                depth = array[row][column + 1];
                tempRow = row;
                tempColumn = column + 1;
            }
            //Check to your left
            if (column > 0 && array[row][column - 1] < depth) {
                depth = array[row][column - 1];
                tempRow = row;
                tempColumn = column - 1;
            }
            //Update coordinates
            row = tempRow;
            column = tempColumn;
            route[routeCount++] = (depth);
        }
        System.out.println(findMax(route));

    }

    /**
     * Find max value in a array
     *
     * @param array
     * @return max element
     */
    private int findMax(int[] array) {
        int max = array[0];
        for (int num : array) {
            if (num > max) {
                max = num;
            }
        }
        return max;
    }


}
