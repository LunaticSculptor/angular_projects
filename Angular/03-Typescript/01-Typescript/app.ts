function getLength(input: string | number): number {
    if (typeof input === "string") {
      return input.length; // OK
    } else {
      return input.toString().length; // Convert number to string and get length
    }
}