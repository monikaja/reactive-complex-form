export class SsnFormatValidators {

  /**
   * Validate dni format
   * @param dni
   * @return {boolean}
   */
  static validDNI( dni ) {
    if(!dni){
      return false;
    }
    dni = dni.toUpperCase();
    let dniLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
    let letter = dniLetters.charAt( parseInt( dni.toUpperCase(), 10 ) % 23 );

    return letter === dni.charAt(8);
  };

  /**
   * Validate nie format
   * @param nie
   * @return {boolean}
   */
  static validNIE( nie ) {

    if(!nie){
      return false;
    }
    nie = nie.toUpperCase();
    // Change the initial letter for the corresponding number and validate as DNI
    let niePrefix = nie.charAt( 0 );

    switch (niePrefix) {
      case 'X': niePrefix = 0; break;
      case 'Y': niePrefix = 1; break;
      case 'Z': niePrefix = 2; break;
    }

    return this.validDNI( niePrefix + nie.substr(1) );

  };

}
