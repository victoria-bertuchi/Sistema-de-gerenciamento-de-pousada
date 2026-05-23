import { StyleSheet } from 'react-native';

const colors = {
  colorBg: '#F3F1E4',
  headerFooter: '#4C4799',
  button: '#867ABC',
  buttonProfile: '#9BC1FA',
  icon: '#000000',
  textIcons: '#000000',
  textTitle: '#F3F1E4'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.colorBg, 
    justifyContent: 'space-between', 
  },

  /* Header */
  headerContainerMenu: {
    backgroundColor: colors.headerFooter,
    width: '100%',
    height: '25%',              
    borderBottomLeftRadius: 40,  
    borderBottomRightRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 80,
  },

  textWrapperMenu: {
    flex: 1,
  },

  titleTextMenu: {
    fontSize: 28,
    color: colors.textTitle,
    fontFamily: 'LeagueSpartan-Regular',
  },

  subTitleTextMenu: {
    fontSize: 32,
    color: colors.textTitle,
    fontFamily: 'LeagueSpartan-Regular',
    lineHeight: 36,
  },

  ramoImageMenu: {
    position: 'absolute',
    width: 130,
    height: 130,
    top: 50,
    right: 5,
  },

  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',           
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    width: '100%',
  },

  menuItemWrapper: {
    alignItems: 'center',
    marginBottom: 20,
    width: 140,
  },

  menuItemWrapperFull: {
    width: '100%',             
    alignItems: 'center',
    marginTop: 10,
  },

  buttonMenu: {
    backgroundColor: colors.button,
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPerfil: {
    backgroundColor: colors.buttonProfile, 
  },

  menuItemText: {
    fontSize: 18,
    color: colors.textIcons,
    fontFamily: 'LeagueSpartan-Regular',
    marginTop: 8,
    textAlign: 'center',
  },


  footerSairContainer: {
    backgroundColor: colors.headerFooter,
    width: '100%',
    height: '10%',
    borderTopLeftRadius: 40,    
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonSair: {
    backgroundColor: 'transparent',
  },

  buttonSairText: {
    fontSize: 22,
    color: colors.textTitle,
    fontFamily: 'LeagueSpartan-Regular',
    textDecorationLine: 'underline',
  }
});