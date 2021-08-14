function swap(a, b) {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;

  console.log(a, b);
}

swap(1455123, 2999999999);
