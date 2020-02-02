package com.piggymetrics.statistics.domain.repository;

import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;
import com.piggymetrics.statistics.domain.entity.DataPoint;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DataPointRepository extends ArangoRepository<DataPoint, String> {

    @Query("FOR doc IN datapoints FILTER doc.id.account == @account RETURN doc")
    List<DataPoint> findByAccount(@Param("account") String account);

    @Override
    @Query("UPSERT {id: @dataPoint.id} INSERT @dataPoint UPDATE @dataPoint IN datapoints RETURN NEW")
    DataPoint save(@Param("dataPoint") DataPoint dataPoint);
}