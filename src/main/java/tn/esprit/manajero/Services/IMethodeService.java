package tn.esprit.manajero.Services;

import tn.esprit.manajero.Entities.Methode;

import java.util.List;

public interface IMethodeService {
    Methode addMethode(Methode methode);

    List<Methode> getAllMethods();

    Methode getMethodeById(String idMethode);

    void deleteMethode(String idMethode);

    public Methode updateMethode(String id, Methode methode);
}
