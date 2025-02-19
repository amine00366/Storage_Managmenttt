package com.example.stage4eme.Repositories;

import com.example.stage4eme.Entities.Armoire;

import com.example.stage4eme.Entities.Bande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArmoireRepository  extends JpaRepository<Armoire, Long> {

    @Query("SELECT b.numCasier, COUNT(b) FROM Bande b WHERE b.armoire.id = :id GROUP BY b.numCasier")
    List<Object[]> countBandesPerCasier(@Param("id") Long id);

    @Query("SELECT b FROM Bande b WHERE b.armoire.id = :id")
    List<Bande> findBandesByArmoireId(@Param("id") Long id);

    @Query("SELECT a FROM Armoire a LEFT JOIN FETCH a.bandes WHERE a.id = :id")
    Armoire findArmoireWithBandesById(@Param("id") Long id);


}
